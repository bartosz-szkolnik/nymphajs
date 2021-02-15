import type { Client } from './client';

export class Session {
  readonly clients = new Set<Client>();

  constructor(public id: string) {}

  join(client: Client) {
    if (client.session) {
      throw new Error('Client already in session.');
    }

    this.clients.add(client);
    client.session = this;
  }

  leave(client: Client) {
    if (!client.session) {
      throw new Error('Client not in session.');
    }

    this.clients.delete(client);
    client.session = null;
  }
}
