export class Vec2 {
  constructor(public x: number, public y: number) {}

  set(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export class Matrix<T> {
  grid: Array<Array<T>> = [];

  get length() {
    return this.grid.length;
  }

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

  getCol(y: number) {
    return this.grid[y];
  }

  forEach(callback: (value: T, x: number, y: number) => void) {
    this.grid.forEach((column, x) => {
      column.forEach((value, y) => {
        callback(value, x, y);
      });
    });
  }

  rotate(direction: number) {
    for (let y = 0; y < this.grid.length; ++y) {
      for (let x = 0; x < y; ++x) {
        [this.grid[x][y], this.grid[y][x]] = [this.grid[y][x], this.grid[x][y]];
      }
    }

    if (direction > 0) {
      this.grid.forEach((row) => row.reverse());
    } else {
      this.grid.reverse();
    }
  }

  static fromArray<T>(array: Array<Array<T>>) {
    const grid = new Matrix<T>();
    array.forEach((row, x) => {
      row.forEach((value, y) => {
        grid.set(x, y, value);
      });
    });

    return grid;
  }
}
