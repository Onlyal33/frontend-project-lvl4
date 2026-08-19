import { existsSync } from 'node:fs';
import { mkdir, rm, rmdir } from 'node:fs/promises';
import path from 'node:path';
import Fastify from 'fastify';
import { io as createSocket } from 'socket.io-client';
import { describe, expect, test } from '@jest/globals';
import appPlugin from './plugin.js';

const timeout = (promise, milliseconds, label) =>
  new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`${label} timed out after ${milliseconds}ms`));
    }, milliseconds);

    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      },
    );
  });

const waitForConnection = (client) =>
  timeout(
    new Promise((resolve, reject) => {
      client.once('connect', resolve);
      client.once('connect_error', reject);
    }),
    3000,
    'Socket.IO connection',
  );

describe('Socket.IO Fastify lifecycle', () => {
  test('closes while a connected client is still active', async () => {
    const staticDirectory = path.join(process.cwd(), 'dist', 'public');
    const distDirectory = path.dirname(staticDirectory);
    const staticDirectoryExisted = existsSync(staticDirectory);
    const distDirectoryExisted = existsSync(distDirectory);
    let app;
    let client;

    try {
      if (!staticDirectoryExisted) {
        await mkdir(staticDirectory, { recursive: true });
      }

      app = Fastify();
      await app.register(appPlugin);
      await app.listen({ host: '127.0.0.1', port: 0 });

      client = createSocket(app.listeningOrigin, { transports: ['websocket'] });
      await waitForConnection(client);

      const acknowledgement = await timeout(
        client
          .timeout(3000)
          .emitWithAck('newChannel', { name: 'shutdown-test' }),
        3000,
        'newChannel acknowledgement',
      );
      expect(acknowledgement).toMatchObject({
        status: 'ok',
        data: { name: 'shutdown-test' },
      });

      const disconnected = new Promise((resolve) => {
        client.once('disconnect', resolve);
      });
      await timeout(app.close(), 3000, 'Fastify shutdown');
      await timeout(disconnected, 1000, 'Socket.IO client disconnect');
      expect(client.connected).toBe(false);
    } finally {
      client?.disconnect();
      await app?.close().catch(() => {});

      if (!staticDirectoryExisted) {
        await rm(staticDirectory, { recursive: true, force: true });
      }
      if (!distDirectoryExisted) {
        await rmdir(distDirectory).catch(() => {});
      }
    }
  }, 10000);
});
