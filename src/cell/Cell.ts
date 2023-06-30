import { Board } from "../grid/Board";
import { Point } from "../shapes/line";

enum State {
  DEAD = 0,
  ALIVE = 1,
}

export enum changed {
  toDead = 0,
  toAlive = 1,
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

  Draw(color: string) {
    const [x, y] = this.position;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(
      x * this.size + 1,
      y * this.size + 1,
      this.size - 2,
      this.size - 2
    );

    requestAnimationFrame(() => this.Draw(color));
  }

  // Dies(color: string) {
  //   requestAnimationFrame(() => this.Draw("white"))
  // }

  GetPosition(): Point {
    return this.position;
  }

  IsAlive(): Boolean {
    return this.state === State.ALIVE;
  }

  SearchNeighbors(board: Board) {
    const [x, y] = this.position;
    const xEdge = board.GetX();
    const yBottom = board.GetY();

    const neighbors: Point[] = [
      [x, y - 1],
      [x + 1, y - 1],
      [x + 1, y],
      [x + 1, y + 1],
      [x, y + 1],
      [x - 1, y + 1],
      [x - 1, y],
      [x - 1, y - 1],
    ];

    const aliveCells = [];

    for (const neighbor of neighbors) {
      const [xPos, yPos] = neighbor;
      if (xPos < 0 || yPos < 0) {
        continue;
      }

      if (xPos >= xEdge || yPos >= yBottom) {
        continue;
      }

      const neighborCell = board.GetCell([xPos, yPos]);
      if (neighborCell && neighborCell.IsAlive()) {
        aliveCells.push(neighborCell);
      }
    }

    let change: changed = null;
    //GOL rules:
    if (aliveCells.length <= 1 && this.state === State.ALIVE) {
      this.state = State.DEAD;
      change = changed.toDead;
      requestAnimationFrame(() => {
        this.Draw("white");
      });
    } else if (aliveCells.length === 3 && this.state === State.DEAD) {
      this.state = State.ALIVE;
      change = changed.toAlive;
      requestAnimationFrame(() => {
        this.Draw("green");
      });
    } else if (aliveCells.length > 3 && this.state === State.ALIVE) {
      this.state = State.DEAD;
      change = changed.toDead;
      requestAnimationFrame(() => {
        this.Draw("white");
      });
    }

    //return change;
  }
}
