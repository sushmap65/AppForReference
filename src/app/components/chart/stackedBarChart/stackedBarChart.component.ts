import {
  Component,
  OnChanges,
  Input,
  ElementRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import * as d3 from 'd3';
import * as _ from 'lodash';
import * as Moment from 'moment';

@Component({
  selector: 'stackedbar-chart',
  templateUrl: './stackedBarChart.component.html',
  styleUrls: ['./stackedBarChart.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class StackedBarChartComponent {
    @ViewChild('stackedChart') private chartContainer: ElementRef;
    @Input() private data: any;
    @Input() private yAxisLabel;
    @Input() private legend;
    private margin: any = { top: 20, bottom: 20, left: 20, right: 20};
    private tooltip: any;
    private chart: any;
    private width: number;
    private height: number;
    private xScale: any;
    private yScale: any;
    private colors: any;
    private xAxis: any;
    private yAxis: any;
    private keys: any;
    private tempData: any;
    private chartData: any;
    private z: any;
    private modifiedData;


    public ngOnInit() {
      this.createChart();
        if(this.data) {
          this.updateChart();
            console.log('chartdata', this.data);
        }       
    }

    public ngOnChanges() {
        if (this.chart) {
            this.updateChart();
            console.log('chartdata', this.data);
        }
    }

    public make_y_gridlines(yScale) {
        return d3.axisLeft(yScale)
        .ticks(10);
    }

public createChart() {

    const element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right - 20;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom - 30;
    const svg = d3.select(element).append('svg')
                .attr('width', element.offsetWidth)
                .attr('height', element.offsetHeight + 100);

    this.tooltip = d3.select(element).append('div').attr('class', 'toolTip');
    this.chart = svg.append('g')
        .attr('transform', `translate(${this.margin.left + 40}, ${this.margin.top})`);

    this.xAxis = d3.scaleBand()
        .rangeRound([0, this.width])
        .paddingInner(0.8)
        .align(0.1);

    this.yScale = d3.scaleLinear()
        .rangeRound([this.height, 0]);
    //console.log('sjdhfj',this.yScale());
    this.z = d3.scaleOrdinal()
        .range(['#23d3d5', '#f7c2a7', '#f2a3ac', '#ff677a', '#5ad6e7','#ff976a']);
    const keyList = _.keys(this.data[0]).slice(1);
    this.keys = _.remove(keyList, (n) => n !== 'total');
    const max = _.maxBy(this.data, (o: any) => o.total).total;
    this.xAxis.domain(this.data.map((d) => d.State));
    this.yScale.domain([0, max]).nice();
    // data.sort(function(a, b) { return b.total - a.total; });
    this.xAxis.domain(this.data.map( (d) => d.State ));
    this.yScale.domain([0, max]);
    this.z.domain(this.keys);
    this.yAxis = svg.append('g')
          .attr('class', 'axis axis-y grid')
          .attr('transform', `translate(${this.margin.left + 20}, ${this.margin.top})`);
    this.yAxis
        .append('text')
        .attr('fill', '#000')
        .attr('transform', 'rotate(-90)')
        .attr('y', -32)
        .attr('dy', '0.91em')
        .attr('text-anchor', 'end')
        .text(this.yAxisLabel);

}
public updateChart() {
        const update = this.chart.append('g')
        .selectAll('g')
        .data(d3.stack().keys(this.keys)(this.data))
        update
        .enter().append('g').merge(update)
        .attr('fill', (d) => this.z(d.key))
        .selectAll('rect')
        .data((d: any) => d)
        .enter().append('rect')
        .attr('x', (d: any) => this.xAxis(d.data.State))
        .attr('y', (d) => Math.abs(this.yScale(d[1])))
        .attr('height', (d) => Math.abs(this.yScale(d[0]) - this.yScale(d[1])))
        .attr('width', this.xAxis.bandwidth())
        .on('mouseover', (d) => {
          console.log('data in d',d);
            const needle = d[1] - d[0];
            //console.log('value ', needle,'d[1]',d[1],'d[0]',d[0]);
            const key = _.invertBy(d.data)[needle];
            if(key.length > 0) {
                let m = key.indexOf('total');
                //console.log('key is', key);
                if(m > -1) {
                  key.splice(m, 1);
                } else {
                  ;
                }
              }
            this.tooltip
                  .style('left', d3.event.layerX - 50 + 'px')
                  .style('top', d3.event.layerY - 70 + 'px')
                  .style('display', 'inline-block')
                  .html(`Total:- ${(d.data.total).toFixed(1)}
                          <br/> ${key}:-  ${(needle).toFixed(1)}`
                      );
              }).on('mouseout', () => {
              this.tooltip
                  .style('display', 'none');
          });

    this.chart.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(0,' + this.height + ')')
        .call(d3.axisBottom(this.xAxis));

    this.chart.append('g')
        .attr('class', 'axis')
        .call(d3.axisLeft(this.yScale).ticks(null, 's'));

  if(this.legend) {
      const legend = this.chart.append('g')
              .attr('font-family', 'sans-serif')
              .attr('font-size', 10)
              .attr('text-anchor', 'end')
              .selectAll('g')
              .data(this.keys.slice().reverse())
              .enter().append('g')
              .attr('transform', (d, i)  => 'translate(' + 25 * i + ',' + this.height + ')');

      legend.append('rect')
        .attr('x', (d, i) => i * 130)
        .attr('width', 150)
        .attr('y', 40)
        .attr('height', 20)
        .attr('fill', this.z);

      legend.append('text')
        .attr('x', (d, i) => (i + 1) * 127 )
        .attr('y', 55)
        .text((d: any) => d);
    }

    update.exit().remove();

    // const update = this.chart
    //     .selectAll('g')
    //     .data(d3.stack().keys(this.keys)(this.data))
    //     .enter()
    //     .append('g')
    //     .attr('fill', (d) => this.z(d.key))
    //     .selectAll('rect')
    //     .data((d: any) => d)
    //     .enter().append('rect')
    //     .attr('x', (d: any) => this.xAxis(d.data.State))
    //     .attr('y', (d) => Math.abs(this.yScale(d[1])))
    //     .attr('height', (d) => Math.abs(this.yScale(d[0]) - this.yScale(d[1])))
    //     .attr('width', this.xAxis.bandwidth())
    //     .on('mouseover', (d) => {
    //               this.tooltip
    //                   .style('left', d3.event.layerX - 50 + 'px')
    //                   .style('top', d3.event.layerY - 70 + 'px')
    //                   .style('display', 'inline-block')
    //                   .html(d[1] + '<br/>' + d[0]);
    //           }).on('mouseout', () => {
    //           this.tooltip
    //               .style('display', 'none');
    //       });

      /*this.yAxis
        .transition()
        .call(
            this.make_y_gridlines(this.yScale)
                .tickSize(-this.width)
            );
*/
    }
}
