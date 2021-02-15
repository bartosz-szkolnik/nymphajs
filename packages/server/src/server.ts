import { Server } from 'ws';
import type * as WebSocket from 'ws';
import { createClient } from './utils';
import type { InternalMessage, Message, UserMessage } from './types';
import { EventEmitter } from './event-emitter';
import {
  handleConnectionClose,
  handleCreateSession,
  handleJoinSession,
} from './handlers';
import { Session } from './session';
import { Client } from './client';
import { isInternalMessage } from './guards';

export type HandlerContext = {
  data: UserMessage;
  client: Client;
  conn: WebSocket;
};

export function createServer(port: number) {
  const server = new Server({ port });
  return server;
}

export function initializeServer(
  port: number,
  listenOnInternals = false,
  showLogs = false
) {
  const server = createServer(port);
  const sessions = new Map<string, Session>();
  const events = new EventEmitter();

  server.on('connection', (conn) => {
    console.info('[WS] Connection established');
    const client = createClient(conn as WebSocket);

    conn.on('message', (msg: string) => {
      if (showLogs) {
        console.info('[WS] Message received', msg);
      }
      const data = JSON.parse(msg) as Message;

      const isInternal = isInternalMessage(data);
      if (isInternal) {
        const { internalType } = data as InternalMessage;
        if (internalType === 'create-session') {
          handleCreateSession(data as InternalMessage, client, sessions);
        } else if (internalType === 'join-session') {
          handleJoinSession(data as InternalMessage, client, sessions);
        } else if (internalType === 'broadcast-message') {
          client.broadcast(data as InternalMessage);
        } else {
          console.warn('Unhandled internal message.');
        }
        if (listenOnInternals) {
          events.emit(internalType, data as InternalMessage);
        }
      } else {
        const userData = data as UserMessage;
        events.emit(userData.type, {
          data: userData,
          client,
          conn,
        });
      }
    });

    conn.on('close', () => {
      handleConnectionClose(client, sessions);
    });
  });

  server.on('listening', () => {
    const port = (server.address() as WebSocket.AddressInfo).port;
    console.info(`WebSocket server created on port ${port}`);
  });

  return { server, events };
}
