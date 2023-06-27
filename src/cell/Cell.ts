import { Point } from "../shapes/line";

enum State {
  DEAD = 0,
  ALIVE = 1,
}

export class Cell {
  private size: number;
  private position: Point = [0, 0];
  private state: State;
  private ctx: CanvasRenderingContext2D;

  constructor(
    size: number,
    position: Point,
    state: State,
    ctx: CanvasRenderingContext2D
  ) {
    this.size = size;
    const [x, y] = position;
    this.position[0] = x;
    this.position[1] = y;
    this.state = state;
    this.ctx = ctx;
  }

  Draw() {
    const [x, y] = this.position;
    this.ctx.fillRect(x * this.size, y * this.size, this.size, this.size);
  }

  GetPosition(): Point {
    return this.position;
  }
}
