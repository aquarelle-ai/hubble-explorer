import { Component, OnInit, Input } from '@angular/core';
import { ChainListenerService } from '../services/chain-listener.service';
import { ActivatedRoute } from '@angular/router';
import { FullBlockItem } from '../model/full-block-item';

declare const moment : any;

@Component({
  selector: 'block-detail',
  templateUrl: './block-detail.component.html',
  styleUrls: ['./block-detail.component.css']
})
export class BlockDetailComponent implements OnInit {

  private _hash: string;

  fullBlock : FullBlockItem;

  get hash(): string {
    return this._hash;
  }

  set hash(value: string) {
    this._hash = value;

    if (this._hash) {
      this.chainService.getBlockByHash(this._hash).subscribe((response : FullBlockItem) => this.fullBlock = response);
    }
  }

  constructor(private chainService: ChainListenerService, private route: ActivatedRoute) { 

  }

  ngOnInit() {
    this.hash = this.route.snapshot.params["hash"];    
  }

  moveToPrevious(ev: MouseEvent) {
    ev.preventDefault();

    if (this.fullBlock) {
      console.log ('Leyendo un nuevo hash', this.fullBlock.previousHash); 
      this.hash = this.fullBlock.previousHash;
    }
  }

  moveToNext(ev: MouseEvent) {
    ev.preventDefault();

    if (this.fullBlock) {
      console.log ('Leyendo un nuevo height', this.fullBlock.height + 1);
      this.chainService.getBlockByHeight(this.fullBlock.height + 1).subscribe((response : FullBlockItem) => {
        console.log (response);
        this.fullBlock = response;
      });
    }
  }

  getFullTime (timestamp ) {
    return moment (timestamp * 1000).format('MMMM Do YYYY, HH:mm:ss');
  }

}
