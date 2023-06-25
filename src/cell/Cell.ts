import { Point } from "../shapes/line";

enum State {
  DEAD = 0,
  ALIVE = 1,
}

class Cell {
  private size: number;
  private position: Point = [0, 0];
  private state: State;

  constructor(size: number, position: Point, state: State) {
    this.size = size;
    const [x, y] = position;
    const xPos = Math.round(x / size) * size;
    const yPos = Math.round(y / size) * size;
    this.position[0] = xPos;
    this.position[1] = yPos;
    this.state = state;
  }
}
