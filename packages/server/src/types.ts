export const CREATE_SESSION = 'create-session';
export const SESSION_CREATED = 'session-created';
export const JOIN_SESSION = 'join-session';
export const BROADCAST_SESSION = 'session-broadcast';
export const BROADCAST_MESSAGE = 'broadcast-message';

type InternalMessageType =
  | typeof CREATE_SESSION
  | typeof SESSION_CREATED
  | typeof JOIN_SESSION
  | typeof BROADCAST_SESSION
  | typeof BROADCAST_MESSAGE;

export type Message<D = unknown> = {
  data?: D;
  id?: string;
  peers?: {
    you: string;
    clients: {
      id: string;
      state: D;
    }[];
  };
};

export type InternalMessage<D = unknown> = Message<D> & {
  internalType: InternalMessageType;
};

export type UserMessage<T = string, D = unknown> = Message<D> & {
  type: T;
};

export type BroadcastInternalMessage = InternalMessage & {
  broadcasterId: string;
};

export type BroadcastMessage = UserMessage & {
  broadcasterId: string;
};
