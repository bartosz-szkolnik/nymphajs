import { InternalMessage } from './types';
import { Client } from './client';
import { Session } from './session';
import { broadcastSession, createSession, getSession } from './utils';

export function handleCreateSession(
  data: InternalMessage,
  client: Client,
  sessions: Map<string, Session>
) {
  const session = createSession();
  session.join(client);
  client.state = data.data;

  sessions.set(session.id, session);
  client.send({
    internalType: 'session-created',
    id: session.id,
  });
}

export function handleJoinSession(
  data: InternalMessage,
  client: Client,
  sessions: Map<string, Session>
) {
  if (data.id) {
    const session = getSession(data.id, sessions) || createSession(data.id);
    session.join(client);
    client.state = data.data;

    sessions.set(data.id, session);
    broadcastSession(session);
  }
}

export function handleConnectionClose(
  client: Client,
  sessions: Map<string, Session>
) {
  console.info('[WS] Connection closed');

  const session = client.session;
  if (session) {
    session.leave(client);
    if (session.clients.size === 0) {
      sessions.delete(session.id);
    }

    broadcastSession(session);
  }
}
