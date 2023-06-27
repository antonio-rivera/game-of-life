import { Grid } from "./Grid";
import { Cell } from "../cell/Cell";
import { Point } from "../shapes/line";
export class Board {
  private values: Cell[][];
  private grid: Grid;

  constructor(grid: Grid) {
    this.grid = grid;
    this.values = [];

    const xLenght = Math.floor(grid.GetWidth() / grid.GetCellSize());
    const yLenght = Math.floor(grid.GetHeight() / grid.GetCellSize());

    for (let i = 0; i <= xLenght; i++) {
      this.values[i] = [];
      for (let j = 0; j <= yLenght; j++) {
        this.values[i][j] = null;
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
          `Exception caught, position is off the board: ${error.message}`
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
          `Exception caught, position is off the board: ${error.message}`
        );
      }
    }
  }
}
