import { Pipe, PipeTransform } from '@angular/core';
import { BlockItem } from './model/block-item';

@Pipe({
  name: 'orderBlockBy',
  pure: false
})
export class OrderBlockByPipe implements PipeTransform {

  transform(list: Array<BlockItem>, args?: any): Array<BlockItem> {
    return list.sort((a: BlockItem, b: BlockItem) => {
      return b.height - a.height;
    });


  }

}
