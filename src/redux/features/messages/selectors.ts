import { RootState } from '../../store';
import { selectcurrentChannelId } from '../channels/selectors';

const selectMessages = (state: RootState) => state.messages;

export const selectMessagesByChannelId = (state: RootState) => {
  const currentId = selectcurrentChannelId(state);
  return selectMessages(state).filter(
    ({ channelId }) => channelId === currentId,
  );
};

export const selectMessagesCountByChannelId = (state: RootState) =>
  selectMessagesByChannelId(state).length;
