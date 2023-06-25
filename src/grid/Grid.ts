import { Line } from "../shapes/line";

export class Grid {
  private cellSize: number;
  private width: number;
  private height: number;
  private ctx: CanvasRenderingContext2D;
  constructor(
    cellSize: number,
    width: number,
    height: number,
    ctx: CanvasRenderingContext2D
  ) {
    this.cellSize = cellSize;
    this.ctx = ctx;
    //Adjust grid borders to avoid cutoffs
    const heightOffset = height % cellSize;
    const widthOffset = width % cellSize;

    this.height = height - heightOffset;
    this.width = width - widthOffset;
  }
  // End constructor

  Draw() {
    for (let i = 0; i <= this.height; i = i + this.cellSize) {
      const line = new Line(this.ctx, [0, i], [this.width, i]);
      line.Draw();
    }

    for (let i = 0; i <= this.width; i = i + this.cellSize) {
      const line = new Line(this.ctx, [i, 0], [i, this.height]);
      line.Draw();
    }
  }

  GetWidth() {
    return this.width - this.cellSize;
  }

  GetHeight() {
    return this.height - this.cellSize;
  }
}
