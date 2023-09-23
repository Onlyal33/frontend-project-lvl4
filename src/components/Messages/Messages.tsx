import { useRef, useEffect } from 'react';
import { shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  selectMessagesByChannelId,
  selectMessagesCountByChannelId,
} from '../../redux/features/messages/selectors';
import { useAppSelector } from '../../redux/hooks';
import { selectChannelName } from '../../redux/features/channels/selectors';

export default function Messages() {
  const filteredMessages = useAppSelector(
    selectMessagesByChannelId,
    shallowEqual,
  );
  const channelName = useAppSelector(selectChannelName);
  const messagesCount = useAppSelector(selectMessagesCountByChannelId);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [messagesCount]);

  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b># {channelName || ''}</b>
        </p>
        <span className="text-muted">
          {t('main.messages.key', { count: messagesCount })}
        </span>
      </div>
      <div className="d-flex flex-column overflow-auto px-5 gap-2">
        {filteredMessages.map((message) => (
          <div key={message.id} className="text-wrap text-break">
            <b>{message.username}</b>: {message.body}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </>
  );
}
