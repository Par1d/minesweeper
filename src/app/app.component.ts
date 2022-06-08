import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, VERSION } from '@angular/core';
import { faVirus } from '@fortawesome/free-solid-svg-icons/faVirus';
import { faFlag } from '@fortawesome/free-regular-svg-icons/faFlag';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('uncover', [
      state(
        'covered',
        style({
          backgroundColor: '#333',
        })
      ),
      state(
        'uncovered',
        style({
          backgroundColor: '#ecf0f1',
        })
      ),
      transition('covered => uncovered', [animate('0.15s')]),
    ]),
  ],
})
export class AppComponent {
  public colors = [
    '#3498db',
    '#27ae60',
    '#c0392b',
    '#8e44ad',
    '#f39c12',
    '#16a085',
    '#2c3e50',
    '#7f8c8d',
  ];

  public faBomb = faVirus;
  public faFlag = faFlag;
  public flags = 0;
  public uncovered = 0;

  public rows = 16;
  public cols = 30;
  public bombCount = 99;
  private gameStarted = false;

  public cells: Cell[][];

  constructor() {
    this.cells = [];
    for (let row = 0; row < this.rows; row++) {
      this.cells.push([]);
      for (let col = 0; col < this.cols; col++) {
        this.cells[row].push(new Cell(row, col));
      }
    }
  }

  private placeBombs(noZone: Cell[]) {
    let bombsPlaced = 0;
    while (bombsPlaced < this.bombCount) {
      const randRow = Math.floor(Math.random() * this.rows);
      const randCol = Math.floor(Math.random() * this.cols);

      const cell = this.cells[randRow][randCol];

      if (!cell.isBomb && !noZone.includes(cell)) {
        this.inEachDirection(cell, (c) => c.bombsTouching++);
        cell.isBomb = true;
        bombsPlaced++;
      }
    }
  }

  public uncover(cell: Cell) {
    if (!this.gameStarted) {
      let noZone = [cell];
      this.inEachDirection(cell, (c) => noZone.push(c));
      this.placeBombs(noZone);

      this.gameStarted = true;
    }

    if (cell.isCovered && !cell.isFlagged) {
      cell.isCovered = false;
      this.uncovered++;

      if (cell.bombsTouching === 0 && !cell.isBomb) {
        setTimeout(
          (_) => this.inEachDirection(cell, (c) => this.uncover(c)),
          25
        );
      }
    }
  }

  public flag(cell: Cell) {
    if (cell.isCovered) {
      cell.isFlagged = !cell.isFlagged;
      this.flags += cell.isFlagged ? 1 : -1;
    }

    return false;
  }

  public doubleClick(cell: Cell) {
    if (!cell.isCovered) {
      let flagsTouching = 0;
      this.inEachDirection(cell, (c) => (flagsTouching += c.isFlagged ? 1 : 0));

      if (flagsTouching === cell.bombsTouching) {
        this.inEachDirection(cell, (c) => this.uncover(c));
      }
    }
  }

  public inEachDirection(cell: Cell, func: (cell: Cell) => void) {
    const directions = [
      { dx: 1, dy: 0 },
      { dx: 1, dy: 1 },
      { dx: 0, dy: 1 },
      { dx: -1, dy: 1 },
      { dx: -1, dy: 0 },
      { dx: -1, dy: -1 },
      { dx: 0, dy: -1 },
      { dx: 1, dy: -1 },
    ];

    for (let dir of directions) {
      const r = cell.row + dir.dy;
      const c = cell.col + dir.dx;

      if (this.cells[r] && this.cells[r][c]) {
        func(this.cells[r][c]);
      }
    }
  }
}

class Cell {
  public row: number;
  public col: number;
  public isBomb: boolean = false;
  public bombsTouching: number = 0;
  public isCovered: boolean = true;
  public isFlagged: boolean = false;

  constructor(row, col) {
    this.row = row;
    this.col = col;
  }
}
