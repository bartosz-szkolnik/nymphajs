import type { InternalMessage, Message, UserMessage } from './types';
import { EventEmitter } from '@nymphajs/core';
import { isInternalMessage } from './guards';

export class ConnectionManager {
  private events = new EventEmitter();
  private conn: WebSocket | null = null;
  private connected = false;
  peers = new Set<string>();

  constructor(private listenOnInternals = false, private showLogs = false) {}

  connect(address: string, initialState?: unknown) {
    this.conn = new WebSocket(address);

    this.conn.addEventListener('open', (event) => {
      console.info('[WS] Connection established.');
      this.connected = true;
      this.initSession(initialState);
    });

    this.conn.addEventListener('message', (event) => {
      if (this.showLogs) {
        console.info('[WS] Received message', JSON.parse(event.data));
      }
      this.receive(event.data);
    });

    this.conn.addEventListener('close', () => {
      this.disconnect();
    });
  }

  on<T>(eventName: string, callback: (data: T) => void) {
    this.events.listen(eventName, callback);
  }

  sendData<T = string, D = unknown>(data: UserMessage<T, D>) {
    this.send(data);
  }

  disconnect() {
    this.connected = false;
    this.conn?.close();
  }

  private send<T, D>(data: UserMessage<T, D> | InternalMessage) {
    const msg = JSON.stringify(data);
    if (!this.connected) {
      return;
    }

    if (this.showLogs) {
      console.info('[WS] Sending message', msg);
    }
    this.conn?.send(msg);
  }

  private initSession(initialState?: unknown) {
    const sessionId = window.location.hash.split('#')[1];
    if (sessionId) {
      this.send({
        internalType: 'join-session',
        id: sessionId,
        data: initialState,
      });
    } else {
      this.send({
        internalType: 'create-session',
        data: initialState,
      });
    }
  }

  private receive(msg: string) {
    const data = JSON.parse(msg) as Message;

    const isInternal = isInternalMessage(data);
    if (isInternal) {
      const { internalType } = data as InternalMessage;
      if (internalType === 'session-created') {
        if (data.id) {
          window.location.hash = data.id;
        }
      } else if (internalType === 'session-broadcast') {
        if (!data.peers) {
          return;
        }

        const me = data.peers.you;
        data.peers.clients
          .filter((client) => client.id !== me)
          .forEach((client) => {
            this.peers.add(client.id);
          });
      }

      if (this.listenOnInternals) {
        const internalData = data as InternalMessage;
        this.events.emit(internalData.internalType, internalData);
      }
    } else {
      const userData = data as UserMessage;
      this.events.emit(userData.type, userData);
    }
  }
}
