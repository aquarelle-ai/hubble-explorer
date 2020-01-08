import { Component, OnInit } from '@angular/core';
import { FullBlockItem } from '../model/full-block-item';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'main-window-manager',
  templateUrl: './main-window-manager.component.html',
  styleUrls: ['./main-window-manager.component.css']
})
export class MainWindowManagerComponent implements OnInit {

  currentBlock: FullBlockItem;
  blockList: FullBlockItem[];

  constructor() { }

  ngOnInit() {
  }

  changeCurrentBlock(newBlock: FullBlockItem) {
    this.currentBlock = newBlock;
  }

  getNewBlockList(newBlockList: FullBlockItem[]) {
    this.blockList = newBlockList;
  }

}
