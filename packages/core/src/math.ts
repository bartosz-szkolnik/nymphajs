export class Vec2 {
  constructor(public x: number, public y: number) {}

  set(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export class Matrix<T> {
  grid: Array<Array<T>> = [];

  set(x: number, y: number, value: T) {
    if (!this.grid[x]) {
      this.grid[x] = [];
    }

    this.grid[x][y] = value;
  }

  get(x: number, y: number) {
    const col = this.grid[x];
    if (col) {
      return col[y];
    }

    return undefined;
  }

  forEach(callback: (value: T, x: number, y: number) => void) {
    this.grid.forEach((column, x) => {
      column.forEach((value, y) => {
        callback(value, x, y);
      });
    });
  }
}
