const PRESSED = 1;
const RELEASED = 0;
type KeyState = typeof PRESSED | typeof RELEASED;

export class KeyboardState {
  // Holds the current state of a given key
  keyStates = new Map<KeyboardEvent['code'], KeyState>();

  // Holds the callback functions for a key code
  keyMap = new Map<KeyboardEvent['code'], (keyState: KeyState) => void>();

  addMapping(
    code: KeyboardEvent['code'],
    callback: (keyState: KeyState) => void
  ) {
    this.keyMap.set(code, callback);
  }

  handleEvent(event: KeyboardEvent) {
    const { code } = event;
    if (!this.keyMap.has(code)) {
      return;
    }

    event.preventDefault();

    const keyState = event.type === 'keydown' ? PRESSED : RELEASED;
    if (this.keyStates.get(code) === keyState) {
      return;
    }

    this.keyStates.set(code, keyState);
    this.keyMap.get(code)!(keyState);
  }

  listenTo(window: Window) {
    ['keydown', 'keyup'].forEach((eventName) => {
      window.addEventListener(eventName, (event) => {
        const e = event as KeyboardEvent;
        this.handleEvent(e);
      });
    });
  }
}
