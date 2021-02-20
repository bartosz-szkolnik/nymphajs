import { Entity } from './entity';

type Receiver = Entity;

export class InputRouter {
  receivers = new Set<Receiver>();

  addReceiver(receiver: Receiver) {
    this.receivers.add(receiver);
  }

  dropReceiver(receiver: Receiver) {
    this.receivers.delete(receiver);
  }

  route(routeInput: (receiver: Receiver) => void) {
    for (const receiver of this.receivers) {
      routeInput(receiver);
    }
  }
}
