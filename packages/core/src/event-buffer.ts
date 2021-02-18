export type Event<T = string | symbol, D = unknown> = {
  name: T;
  args: D[];
};

export class EventBuffer<T = string> {
  private events: Event[] = [];

  emit(name: string | symbol, ...args: unknown[]) {
    const event: Event = { name, args };
    this.events.push(event);
  }

  process(name: string | symbol, callback: (...args: unknown[]) => void) {
    this.events.forEach((event) => {
      if (event.name === name) {
        callback(...event.args);
      }
    });
  }

  clear() {
    this.events = [];
  }
}
