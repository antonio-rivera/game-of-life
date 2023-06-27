import { Grid } from "./grid/Grid";
import { Board } from "./grid/Board";
import { Cell } from "./cell/Cell";
import "./file.css";

const canvas = <HTMLCanvasElement>document.getElementById("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const ctx = canvas.getContext("2d")!;

const grid = new Grid(100, canvas.width, canvas.height, ctx);
grid.Draw();

const board = new Board(grid);
console.log(board);
// ctx.fillRect(0, 400, 100, 100);
let count = 0;
while (count <= 10) {
  const x = Math.floor(Math.random() * board.GetX());
  const y = Math.floor(Math.random() * board.GetY());

  const cell = new Cell(grid.GetCellSize(), [x, y], 1, ctx);
  cell.Draw();

  board.SetCell(cell);
  count++;
}
