import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { List, Card } from 'src/app/models/listModel';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  dataList: List[];
  @Input() currentCard: Card;
  @Input() containerInd: number;
  @Output() newCards = new EventEmitter<List[]>();
  @Input() cardIndex: number;
  constructor() { }

  ngOnInit() {
    this.dataList = JSON.parse(localStorage.getItem('list'));
  }
  removeCard() {
    this.dataList[this.containerInd].cards.forEach((ele, index) => {
      if (ele.id === this.currentCard.id) {
        this.dataList[this.containerInd].cards.splice(index, 1);
      }
    });
    localStorage.setItem('list', JSON.stringify(this.dataList));
    this.dataList = JSON.parse(localStorage.getItem('list'));
    this.newCards.emit(this.dataList);
  }

}
