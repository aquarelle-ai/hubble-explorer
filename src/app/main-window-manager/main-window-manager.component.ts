import { Component, OnInit } from '@angular/core';

@Component({
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

  changeCurrentBlock(newBlock : FullBlockItem) {
    this.currentBlock = newBlock;
  }

  getNewBlockList(newBlockList : FullBlockItem[]) {
    this.blockList = newBlockList;
  }

}
