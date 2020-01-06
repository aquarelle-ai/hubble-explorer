import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { ChainListenerService } from '../services/chain-listener.service';
import { FullBlockItem } from '../model/full-block-item';


declare const $: any;
declare const moment: any;

const CHART_MINUTES = 3;
const FLOAT_DIVISOR = 10000;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'price-chart',
  templateUrl: './price-chart.component.html',
  styleUrls: ['./price-chart.component.css']
})
export class PriceChartComponent implements OnInit {

  @Output() clickPoint = new EventEmitter();
  private _blockList;
  private _dataItems: number[];
  private _labelItems: number[];
  private _serie;

  private plot;
  latestBlock: FullBlockItem;

  /**
   * All the options used by the chart library
   */
  private chartOptions = {
    series: {
      lines: { show: true },
      points: { show: false }
    },
    selection: {
      mode: 'x'
    },
    grid: {
      hoverable: true,
      clickable: true,
      markings: this.weekendAreas
    },
    // xaxis: {
    //   mode: "time",
    //   timeBase: "miliseconds",
    //   tickLength: 1,
    //   gridLines: false
    // },
    // zoom: {
    // 	interactive: true
    // },
    pan: {
      interactive: true,
      enableTouch: true
    }
  };

  constructor(private chainService: ChainListenerService, private changeRef: ChangeDetectorRef) {
    this._dataItems = Array(CHART_MINUTES * 60).join('0').split('').map(a => parseFloat(a));
    this._labelItems = Array(CHART_MINUTES * 60).join('0').split('').map(a => parseFloat(a));
  }

  ngOnInit() {
    this.initializeChart();
    this.chainService.BlockEvent.subscribe(block => this.renderChart(block));
  }

  /**
   * Called by the event of chain. Get the new block and redraw the chart
   */
  renderChart(block: FullBlockItem) {
    this.latestBlock = block;
    this._dataItems.shift();
    this._dataItems.push(block.payload.averagePrice); // To improve the precision

    this._labelItems.shift();
    this._labelItems.push(block.timestamp);
    // this._labelItems.push(moment(block.timestamp * 1000).format("YYY-MM-DD HH:mm"));

    // Build the series with the expected layout
    const serie = [];
    for (let i = 0; i < this._dataItems.length; i++) {
      serie.push([i, this._dataItems[i]]);
    }

    // Redraw all
    this.plot = $.plot('#placeholder', [{
      data: serie,
      label: 'Price',
      lines: { show: true, fill: true }
    }],
      this.chartOptions);

    this.changeRef.markForCheck();
  }

  /**
   * Helper function to draw the weekends in the chart. Called for the chart
   */
  weekendAreas(axes) {

    const markings = [],
      d = new Date(axes.xaxis.min);

    // go to the first Saturday
    d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 1) % 7));
    d.setUTCSeconds(0);
    d.setUTCMinutes(0);
    d.setUTCHours(0);

    let i = d.getTime();

    // when we don't set yaxis, the rectangle automatically
    // extends to infinity upwards and downwards
    do {
      markings.push({ xaxis: { from: i, to: i + 2 * 24 * 60 * 60 * 1000 } });
      i += 7 * 24 * 60 * 60 * 1000;
    } while (i < axes.xaxis.max);

    return markings;
  }

  /**
   * Initialize the canvas and set the events
   */
  initializeChart() {
    this.plot = $.plot('#placeholder', [{
      data: [],
      label: 'Price',
      lines: { show: true, fill: true }
    }], this.chartOptions);

    // Insert a div dynamically into the outest element
    // $("<div id='tooltip'></div>").appendTo("body");

    const el = $('#placeholder');
    el.bind('plotselected', (event, ranges) => {

      // do the zooming
      $.each(this.plot.getXAxes(), function (_, axis) {
        const opts = axis.options;
        opts.min = ranges.xaxis.from;
        opts.max = ranges.xaxis.to;
      });
      this.plot.setupGrid();
      this.plot.draw();
      this.plot.clearSelection();

      // don't fire event on the overview to prevent eternal loop

      // overview.setSelection(ranges, true);
    });
    // Hovering over the grid
    el.bind('plothover', (event, pos, item) => {

      if (!pos.x || !pos.y) {
        return;
      }

      if (item) {
        const x = item.datapoint[0], y = item.datapoint[1].toFixed(5);
        if (y > 0) {
          const timeLabel = moment(this._labelItems[x] * 1000).format('YYYY-MM-DD, HH:mm:ss');
          const tooltipText = item.series.label + ': <strong>' + y + '</strong> at ' + timeLabel;

          $('#chart-tooltip').html(tooltipText)
            .css({ top: item.pageY + 5, left: item.pageX + 5 })
            .fadeIn(100);
        } else {
          $('#chart-tooltip').hide();
        }
      } else {
        $('#chart-tooltip').hide();
      }
    });

    // When the mouse is moved, the tooltips will hide
    el.bind('plothovercleanup', (event, pos, item) => {
      $('#chart-tooltip').hide();
    });

    // Click on the grid
    el.bind('plotclick', (event, pos, item) => {
      if (item) {
        this.plot.highlight(item.series, item.datapoint);
        console.log(item);
      }
    });
  }

}
