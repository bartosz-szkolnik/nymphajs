export type Listener<T = string, D = unknown> = {
  name: T;
  callback: (...data: D[]) => void;
};

export class EventEmitter<T = string> {
  private listeners = new Set<Listener<T>>();

  listen<D = unknown>(name: T, callback: (...data: D[]) => void) {
    const listener = { name, callback } as Listener<T>;

    this.listeners.add(listener);
    return listener;
  }

  emit(name: T, ...data: any) {
    this.listeners.forEach((listener) => {
      if (listener.name === name) {
        listener.callback(...data);
      }
    });
  }

  removeListener(listener: Listener<unknown, T>) {
    this.listeners.delete(listener as Listener<T>);
  }
}
