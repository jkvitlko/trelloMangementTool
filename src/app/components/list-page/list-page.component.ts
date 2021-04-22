import { Component, OnInit } from '@angular/core';
import { Card, List } from '../../models/listModel';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {
  tempList: List[] = [{
    title: 'Products',
    cards: [
      {id:1, title: 'Sales', desc: 'sales and company' }, {id: 2, title: 'UAT Testing', desc: 'Ask Engg to setup the testing env' }
    ]
  }, {
    title: 'Teams', cards: [
      {id:3, title: 'Sales', desc: 'sales and company' }, {id:4, title: 'UAT Testing', desc: 'Ask Engg to setup the testing env' }
    ]
  },];
  list: List[];
  dragDivInd: number;
  constructor() { }

  ngOnInit() {
    let localData = JSON.parse(localStorage.getItem('list'));
    // once the local storage become empty can uncomment this below line to add new items
    // localStorage.setItem('list', JSON.stringify(this.tempList));
    this.list = localData ? localData : localStorage.setItem('list', JSON.stringify(this.tempList));
    console.log(JSON.parse(localStorage.getItem('list')))
  }

  addNewList() {
    let newList: List;
    newList = {
      title: 'Newlist',
      cards: []
    }
    this.list.push(newList);
    this.updateTheLocalStorage(this.list);
  }

  addCard(ind: number) {
    let tempId = Math.floor(Math.random() * 100);
    console.log(tempId);
    this.list[ind].cards.push({ id: tempId,title: 'Sales', desc: 'sales and company' });
    this.updateTheLocalStorage(this.list);
  }
  removeList(listIndex: number) {
    this.list.splice(listIndex, 1);
    this.updateTheLocalStorage(this.list);
  }
  getNewCards(event: List[]) {
    this.list = event;
  }
  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(ev, card: Card, listInd: number) {
    this.dragDivInd = listInd;
    localStorage.setItem('card', JSON.stringify(card));
  }
  drop(ev, ind: number) {
    ev.preventDefault();
    let draggedCard = JSON.parse(localStorage.getItem('card'));
    this.list[ind].cards.unshift(draggedCard);
    this.list[this.dragDivInd].cards.forEach((ele, index) => {
      if (ele.id === draggedCard.id) {
        this.list[this.dragDivInd].cards.splice(index, 1);
      }
    });
    this.updateTheLocalStorage(this.list);
  }
  updateTheLocalStorage(list: List[]) {
    localStorage.setItem('list', JSON.stringify(list));
    this.list = JSON.parse(localStorage.getItem('list'));
  }
}
