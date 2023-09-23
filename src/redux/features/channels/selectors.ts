import { RootState } from '../../store';

export const selectcurrentChannelId = (state: RootState) =>
  state.channels.currentId;

export const selectChannels = (state: RootState) => state.channels.list;

export const selectChannelName = (state: RootState) => {
  const currentId = selectcurrentChannelId(state);
  return selectChannels(state).find(({ id }) => id === currentId)?.name;
};

export const selectChannelNames = (state: RootState) =>
  selectChannels(state).map(({ name }) => name);

export const selectFiletredChannelNames = (
  state: RootState,
  idToRename: string,
) =>
  selectChannels(state)
    .filter(({ id }) => id !== idToRename)
    .map(({ name }) => name);
