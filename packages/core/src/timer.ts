export class Timer {
  private accumulatedTime = 0;
  private lastTime = 0;

  animationFrameId = 0;

  constructor(private deltaTime = 1 / 60) {}

  updateProxy = (time: number) => {
    this.accumulatedTime += (time - this.lastTime) / 1000;

    // @TODO: remove later
    if (this.accumulatedTime > 1) {
      this.accumulatedTime = 1;
    }

    while (this.accumulatedTime > this.deltaTime) {
      this.update(this.deltaTime);

      this.accumulatedTime -= this.deltaTime;
    }

    this.lastTime = time;
    this.enqueue();
  };

  start() {
    this.enqueue();
  }

  setUpdateFn(fn: (deltaTime: number) => void) {
    this.update = fn;
  }

  private enqueue() {
    this.animationFrameId = requestAnimationFrame(this.updateProxy);
  }

  private update(deltaTime: number) {}
}
