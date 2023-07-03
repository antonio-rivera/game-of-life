import { Grid } from "./grid/Grid";
import { Board } from "./grid/Board";
import { Cell } from "./cell/Cell";
import "./file.css";

window.addEventListener("load", () => {
  const canvas = <HTMLCanvasElement>document.getElementById("canvas");
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  const ctx = canvas.getContext("2d")!;

  const grid = new Grid(25, canvas.width, canvas.height, ctx);
  grid.Draw();

  const board = new Board(grid, ctx);

  let count = 0;
  let cellToGridRatio = 0.3;
  let totalCells = Math.floor(cellToGridRatio * (board.GetX() * board.GetY()));

  while (count <= totalCells) {
    const x = Math.floor(Math.random() * board.GetX());
    const y = Math.floor(Math.random() * board.GetY());
    CreateCell(x, y);
    count++;
  }

  function CreateCell(x: number, y: number) {
    const cell = new Cell(grid.GetCellSize(), [x, y], 1, "green", ctx);
    cell.Draw();
    board.SetCell(cell);
  }

  board.Start(1000);
});
