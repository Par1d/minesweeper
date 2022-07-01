import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-difficulty-selector',
  templateUrl: './difficulty-selector.component.html',
  styleUrls: ['./difficulty-selector.component.css'],
})
export class DifficultySelectorComponent implements OnInit {
  difficulty: string = 'Beginner';

  constructor() {}

  ngOnInit() {}

  newGameClicked() {
    alert(this.difficulty);
  }
}
