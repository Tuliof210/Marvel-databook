import { Component, Input, OnInit } from '@angular/core';
// Interfaces
import { Character } from '../../interfaces';

@Component({
  selector: 'component-card',
  templateUrl: './card.template.html',
  styleUrls: ['./card.style.scss'],
})
export class CardComponent implements OnInit {
  @Input() characterData: Character;
  undefinedCharacter: Character = {
    id: 0,
    name: '',
    thumbNail: '',
  };

  constructor() {}

  ngOnInit(): void {}
}
