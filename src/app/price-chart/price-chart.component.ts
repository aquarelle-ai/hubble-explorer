import { Component, OnInit, Input } from '@angular/core';
import { BlockItem } from '../model/block-item';
import { ChainListenerService } from '../services/chain-listener.service';

declare const Chartist: any;
declare const moment: any;


@Component({
  selector: 'price-chart',
  templateUrl: './price-chart.component.html',
  styleUrls: ['./price-chart.component.css']
})
export class PriceChartComponent implements OnInit {

  private _blockList;

  @Input()
  set blockList(value: BlockItem[]) {
    this._blockList = value;
    this.generateChart();
  }

  get blockList(): BlockItem[] {
    return this._blockList;
  }

  private chart;

  constructor(private chainService: ChainListenerService) {
    // create 10 fake points to initialize the graph
    // for (var i = 0; i <= 9; i++) {
    //   this.blockList.push ()
    // }
  }

  ngOnInit() {
    this.chainService.BlockEvent.subscribe(block => {

    })
    this.generateChart();
    // // Update the chart every time it's created with a delay of 1.5 seconds
    // this.chart.on('created', function () {
    //   if (window.__anim0987432598723) {
    //     clearTimeout(window.__anim0987432598723);
    //     window.__anim0987432598723 = null;
    //   }
    //   window.__anim0987432598723 = setTimeout(chart.update.bind(chart), 1500);
    // });
  }

  generateChart() {
    if (this.blockList && this.blockList.length > 0) {
      // Our labels and three data series
      var labels = [];
      var seriesData = [];
      this.blockList.forEach(item => {
        // X labels
        var timeSt = moment(item.timestamp * 1000).format('YY-MM-DD, HH:mm:ss');
        labels.push(timeSt);
        // Series
        seriesData.push(item.priceIndex);
      });

      console.log(seriesData);
      console.log(labels);

      var data = {
        labels: labels,
        series: {
          name: 'index',
          data: seriesData
        }
      };

      // We are setting a few options for our chart and override the defaults
      var options = {
        // Don't draw the line chart points
        showPoint: true,
        // Disable line smoothing
        lineSmooth: true,
        // X-Axis specific configuration
        axisX: {
          // We can disable the grid for this axis
          showGrid: true,
          // and also don't show the label
          showLabel: true
        },
        // Y-Axis specific configuration
        axisY: {
          // Lets offset the chart a bit from the labels
          offset: 60,
          // The label interpolation function enables you to modify the values
          // used for the labels on each axis. Here we are converting the
          // values into million pound.
          labelInterpolationFnc: function (value) {
            return '$ ' + value;
          }
        }
      };

      // All you need to do is pass your configuration as third parameter to the chart function
      new Chartist.Line('.ct-chart', data, options);
    }
  }

}
