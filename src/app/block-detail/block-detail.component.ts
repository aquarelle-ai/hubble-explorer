import { Component, OnInit, Input } from '@angular/core';
import { BlockItem } from '../model/block-item';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'block-detail',
  templateUrl: './block-detail.component.html',
  styleUrls: ['./block-detail.component.css']
})
export class BlockDetailComponent implements OnInit {

  private _block: BlockItem;

  fullBlock;

  get block () : BlockItem {
    return this._block;
  }

  @Input()
  set block (value: BlockItem) {
    this._block = value;

    if (this.block != null) {
      var fullUrl = 'http://localhost:8080/' + this.block.nodeAddress; //TODO: Get the server URL from a configuration file
      this.httpClient.get(fullUrl).subscribe (response => this.fullBlock = response)
    }
  }

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
  }

  moveToPrevious (ev: MouseEvent, fullBlock) {
    ev.preventDefault();

    var previousBlock =  {
      nodeAddress: fullBlock.previousAddress,
    } as BlockItem;
    this.block = previousBlock;
  }

}
