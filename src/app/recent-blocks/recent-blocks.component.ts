import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ChainListenerService } from '../services/chain-listener.service';
import { BlockItem } from '../model/block-item';

declare const moment: any;


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'recent-blocks',
  templateUrl: './recent-blocks.component.html',
  styleUrls: ['./recent-blocks.component.css']
})
export class RecentBlocksComponent implements OnInit {

  @Output() clickNode = new EventEmitter<BlockItem>();
  @Output() refresh = new EventEmitter<BlockItem[]>();

  blockList: BlockItem[] = [];
  currentBlock: BlockItem;

  constructor(private blocksService: ChainListenerService) { }

  ngOnInit() {

    this.blocksService.BlockEvent.subscribe(block => {
      this.blockList.push(block);

      // Sort the full list to move the highest value to the first place
      this.blockList = this.blockList.sort((a: BlockItem, b: BlockItem) => {
        return b.height - a.height;
      });

      if (this.blockList.length > 10) {
        this.blockList.pop(); // Remove the last item
      }

      this.refresh.emit(this.blockList);

    });
  }

  translateTimestamp(timestamp) {
    return moment(timestamp * 1000).format('YYYY-MM-DD, HH:mm:ss');
  }

  setCurrentBlock(ev: MouseEvent, block: BlockItem) {
    ev.preventDefault();

    this.currentBlock = block;
    this.clickNode.emit (block);
  }

}
