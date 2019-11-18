import { Component, OnInit } from '@angular/core';
import { BlockItem } from '../model/block-item';

@Component({
  selector: 'main-window-manager',
  templateUrl: './main-window-manager.component.html',
  styleUrls: ['./main-window-manager.component.css']
})
export class MainWindowManagerComponent implements OnInit {

  
  currentBlock: BlockItem;

  constructor() { }

  ngOnInit() {
  }

  changeCurrentBlock(newBlock : BlockItem) {
    this.currentBlock = newBlock;
  }

}
