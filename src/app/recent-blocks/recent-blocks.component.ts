import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ChainListenerService } from '../services/chain-listener.service';
import { FullBlockItem } from '../model/full-block-item';

declare const moment: any;


const TABLE_MAX_ROWS = 15;
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'recent-blocks',
  templateUrl: './recent-blocks.component.html',
  styleUrls: ['./recent-blocks.component.css']
})
export class RecentBlocksComponent implements OnInit {

  @Output() clickNode = new EventEmitter<FullBlockItem>();
  @Output() refresh = new EventEmitter<FullBlockItem[]>();

  blockList: FullBlockItem[] = [];
  currentBlock: FullBlockItem;

  constructor(private chainService: ChainListenerService) { }

  ngOnInit() {
    // Websocket subscription
    this.chainService.BlockEvent.subscribe(block => {
      this.blockList.push(block);

      // Sort the full list to move the highest value to the first place
      this.blockList = this.blockList.sort((a: FullBlockItem, b: FullBlockItem) => {
        return b.height - a.height;
      });

      if (this.blockList.length > TABLE_MAX_ROWS) {
        this.blockList.pop(); // Remove the last item
      }

      this.refresh.emit(this.blockList);
    });

    // Note: this code will be applied in the future, to show the latest blocks
    this.ReadLatest();
  }

  /**
   * Get the latest blocks
   */
  private ReadLatest() {
    this.chainService.getLatestBlocks(Date.now() * 1000).subscribe((response: FullBlockItem[]) => {
      // convert them into light blocks
      this.blockList = []
      response.forEach(block => {
        const newLigthBlock = <FullBlockItem>{
          hash: block.hash,
          height: block.height,
          timestamp: block.timestamp,
          priceIndex: block.payload.averagePrice,
          confirmations: block.evidence.length
        };
        this.blockList.push(newLigthBlock);
      });
    });
  }

  translateTimestamp(timestamp) {
    return moment(timestamp * 1000).format('YYYY-MM-DD, HH:mm:ss');
  }

  setCurrentBlock(ev: MouseEvent, block: FullBlockItem) {
    ev.preventDefault();

    this.currentBlock = block;
    this.clickNode.emit (block);
  }

}
