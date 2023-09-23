// @ts-check

import path from 'path';
import { fileURLToPath } from 'url';
import Pug from 'pug';
import pointOfView from '@fastify/view';
import fastifySocketIo from 'fastify-socket.io';
import { fastifyStatic } from '@fastify/static';
import fastifyJWT from '@fastify/jwt';
import HttpErrors from 'http-errors';

import addRoutes from './routes.js';

const { Unauthorized } = HttpErrors;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';
const appPath = path.join(__dirname, '..');
const isDevelopment = !isProduction;

const setUpViews = (app) => {
  const devHost = 'http://localhost:8090';
  const domain = isDevelopment ? devHost : '';
  app.register(pointOfView, {
    engine: {
      pug: Pug,
    },
    defaultContext: {
      assetPath: (filename) => `${domain}/assets/${filename}`,
    },
    root: path.join(__dirname, 'views'),
  });
};

const setUpStaticAssets = (app) => {
  app.register(fastifyStatic, {
    root: path.join(appPath, 'dist/public'),
    prefix: '/assets',
  });
};

const setUpAuth = (app) => {
  app
    .register(fastifyJWT, {
      secret: 'supersecret',
    })
    .decorate('authenticate', async (req, reply) => {
      try {
        await req.jwtVerify();
      } catch (_err) {
        reply.send(new Unauthorized());
      }
    });
};

export default async (app, options) => {
  setUpAuth(app);
  setUpViews(app);
  setUpStaticAssets(app);
  await app.register(fastifySocketIo);
  addRoutes(app, options?.state || {});

  return app;
};
