import { Grid } from "./grid/Grid";
import "./file.css";

const canvas = <HTMLCanvasElement>document.getElementById("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const ctx = canvas.getContext("2d")!;

const grid = new Grid(100, canvas.width, canvas.height, ctx);
grid.Draw();

//ctx.fillRect(400, 200, 100, 100);
