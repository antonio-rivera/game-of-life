import { Grid } from "./Grid";
import { Cell } from "../cell/Cell";
import { Point } from "../shapes/line";

//Global variable to animate the game
const Sleep = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));

export class Board {
  private values: Cell[][];
  private grid: Grid;
  private ctx: CanvasRenderingContext2D;

  constructor(grid: Grid, ctx: CanvasRenderingContext2D) {
    this.grid = grid;
    this.ctx = ctx;
    this.values = [];

    const xLenght = Math.floor(grid.GetWidth() / grid.GetCellSize());
    const yLenght = Math.floor(grid.GetHeight() / grid.GetCellSize());

    for (let i = 0; i <= xLenght; i++) {
      this.values[i] = [];
      for (let j = 0; j <= yLenght; j++) {
        this.values[i][j] = new Cell(
          this.grid.GetCellSize(),
          [i, j],
          0,
          "white",
          ctx
        );
      }
    }
  }

  GetX() {
    return this.values.length;
  }

  GetY() {
    return this.values[0].length;
  }

  GetCell(position: Point) {
    const [x, y] = position;
    try {
      return this.values[x][y];
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(
          `Exception caught at GetCell(), position ${position} is off the board: ${error.message}`
        );
      }
    }
  }

  SetCell(cell: Cell) {
    try {
      const [x, y] = cell.GetPosition();
      this.values[x][y] = cell;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(
          `Exception caught at SetCell(), position ${cell.GetPosition()} is off the board: ${
            error.message
          }`
        );
      }
    }
  }

  async Start(iters: number) {
    while (iters > 0) {
      for (let i = 0; i < this.values.length; i++) {
        for (let j = 0; j < this.values[0].length; j++) {
          this.values[i][j].SearchNeighbors(this);
        }
      }

      // End of generation
      await Sleep(200);
      this.GenerationalTransition();

      iters--;
    }
  }

  GenerationalTransition() {
    for (let i = 0; i < this.values.length; i++) {
      for (let j = 0; j < this.values[0].length; j++) {
        this.values[i][j].Transition();
      }
    }
  }
}
