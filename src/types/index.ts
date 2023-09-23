export interface ChannelType {
  id: string;
  name: string;
  removable: boolean;
}

export type ChannelNameToServer = Pick<ChannelType, 'name'>;
export type ChannelIdToServer = Pick<ChannelType, 'id'>;
export type ChannelNameAndIdToServer = Omit<ChannelType, 'removable'>;

export interface MessageType {
  id: string;
  username: string;
  channelId: string;
  body: string;
}

export type MessageToServer = Omit<MessageType, 'id'>;

export type ChannelsType = ChannelType[];

export type MessagesType = MessageType[];

export interface ClientToServerEventData {
  newMessage: MessageToServer;
  newChannel: ChannelNameToServer;
  removeChannel: ChannelIdToServer;
  renameChannel: ChannelNameAndIdToServer;
}

export type ServerToClientEventData = {
  [P in keyof ClientToServerEventData]: P extends 'newMessage'
    ? MessageType
    : ChannelType;
};

export type ClientToServerResponseEventData = {
  [P in keyof ClientToServerEventData]: {
    data: ServerToClientEventData[P];
    status: string;
  };
};

export type ClientToServerEvents = {
  // no aguments due to incorrect socket-io library typing
  [P in keyof ClientToServerEventData]: () => Promise<
    ClientToServerResponseEventData[P]
  >;
};

export type ApiWithAcks = {
  [P in keyof ClientToServerEventData]: (
    data: ClientToServerEventData[P],
  ) => Promise<ClientToServerResponseEventData[P]>;
};

export type ServerToClientEvents = {
  [P in keyof ServerToClientEventData]: (
    data: ServerToClientEventData[P],
  ) => void;
};

export interface ModalType {
  isOpen?: boolean;
  type: 'add' | 'remove' | 'rename' | null;
  item: ChannelType | null;
}

export interface FormikActions {
  resetForm: () => void;
  setSubmitting: (_: boolean) => void;
  setFieldError: (_field: string, _text: string) => void;
}

export interface AuthData {
  logIn: (data: { token: string; username: string }) => void;
  logOut: () => void;
  user: string | null;
  getAuthHeader: () =>
    | { Authorization: string }
    | { Authorization?: undefined };
}
