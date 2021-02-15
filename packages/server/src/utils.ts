import { Client } from './client';
import { Session } from './session';
import type * as WebSocket from 'ws';

const DEFAULT_CHARS = 'abcdefghjkmnopqrstwxyz0123456789';

export function createId(length = 6, chars = DEFAULT_CHARS) {
  let id = '';
  while (length--) {
    id += chars[(Math.random() * chars.length) | 0];
  }

  return id;
}

export function createSession(
  id = createId(),
  sessions = new Map<string, Session>()
) {
  if (sessions.has(id)) {
    throw new Error(`Session ${id} already exist.`);
  }

  const session = new Session(id);
  console.info('Creating session...', session);

  sessions.set(id, session);
  return session;
}

export function createClient(conn: WebSocket, id = createId()) {
  return new Client(conn, id);
}

export function getSession(id: string, sessions: Map<string, Session>) {
  if (!sessions.has(id)) {
    return null;
  }

  return sessions.get(id)!;
}

export function broadcastSession(session: Session) {
  const clients = [...session.clients];

  clients.forEach((client) => {
    client.send({
      internalType: 'session-broadcast',
      peers: {
        you: client.id,
        clients: clients.map((peer) => {
          return {
            id: peer.id,
            state: peer.state,
          };
        }),
      },
    });
  });
}
