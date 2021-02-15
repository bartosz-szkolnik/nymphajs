import type { Session } from './session';
import type * as WebSocket from 'ws';
import type {
  BroadcastInternalMessage,
  InternalMessage,
  Message,
  UserMessage,
} from './types';
import { isInternalMessage } from './guards';

export class Client {
  session: Session | null = null;
  state: unknown = {};

  constructor(
    private conn: WebSocket,
    public id: string,
    private showLogs = false
  ) {}

  send<T>(data: UserMessage<T> | InternalMessage) {
    const msg = JSON.stringify(data);
    if (this.showLogs) {
      console.info('[WS] Sending message: ', msg);
    }
    this.conn.send(msg, (err) => {
      if (err) {
        console.error('[WS] Message failed', msg, err);
      }
    });
  }

  broadcast<T>(data: UserMessage<T> | InternalMessage) {
    if (!this.session) {
      throw new Error('Cannot broadcast without a session.');
    }

    const broadcastData = this.getMessage(data);
    [...this.session.clients].forEach((client) => {
      if (this === client) {
        return;
      }

      client.send(broadcastData);
    });
  }

  private getMessage(data: Message) {
    if (isInternalMessage(data)) {
      return {
        ...data,
        internalType: 'broadcast-message',
        broadcasterId: this.id,
      } as BroadcastInternalMessage;
    }

    const userData = data as UserMessage;
    return {
      ...userData,
      type: userData.type,
      broadcasterId: this.id,
    };
  }
}
