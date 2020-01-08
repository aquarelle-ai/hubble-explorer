import { Pipe, PipeTransform } from '@angular/core';
import { FullBlockItem } from './model/full-block-item';

@Pipe({
  name: 'orderBlockBy',
  pure: false
})
export class OrderBlockByPipe implements PipeTransform {

  transform(list: Array<FullBlockItem>, args?: any): Array<FullBlockItem> {
    return list.sort((a: FullBlockItem, b: FullBlockItem) => {
      return b.height - a.height;
    });


  }

}
