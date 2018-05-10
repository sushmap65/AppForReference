import {
  Component,
  OnChanges,
  AfterViewInit,
  Input,
  ElementRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import * as d3 from 'd3';
import * as moment from 'moment';

@Component({
  selector: 'line-chart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class LineChartComponent {
	@ViewChild('chart') private chartContainer: ElementRef;
	@Input() private data: Array<{date, value}>;
	@Input() private itemName: string;
	private margin: any = { top: 20, bottom: 20, left: 20, right: 20};
	private chart: any;
	private width: number;
	private height: number;
	private xScale: any;
	private yScale: any;
	private colors: any;
	private xAxis: any;
	private yAxis: any;

	/*public ngOnInit() {
		this.createChart();
		console.log('data in line', this.data);
		// if (this.data) {
		//   this.updateChart();
		// }
	}*/

	public ngOnChanges() {
	 if (!this.isEmpty(this.data)) {
	  this.createChart();
	  console.log('data in line', this.data);
	 }
	}

	public isEmpty(obj) {
		return Object.keys(obj).length === 0;
	}
	public createChart() {
		const element = this.chartContainer.nativeElement;
		this.width = element.offsetWidth - this.margin.left - this.margin.right;
		this.height = element.offsetHeight - this.margin.top - this.margin.bottom;

		const formatTime = d3.timeFormat('%e %B %H:%M:%S');

		const svg = d3.select(element).append('svg')
			.attr('width', element.offsetWidth)
			.attr('height', element.offsetHeight)
			.attr('class', 'svg-chart');
		// chart plot area
		this.chart = svg.append('g')
			.attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
		this.chart
			.append('text')
	        .attr('x', (this.width / 2))
	        .attr('y', 6 - (this.margin.top / 2))
	        .attr('text-anchor', 'middle')
	        .style('font-size', '16px')
	        .style('fill', '#999')
	        // .style('text-decoration', 'underline')
	        .text(this.itemName);
	        // .text(this.itemName + ' vs Datetime Graph');
		// define X & Y domains
		this.xScale = d3.scaleUtc()
			.range([0, this.width]);
		this.yScale = d3.scaleLinear()
			.range([this.height, 0]);

	    // create scales
		this.xScale.domain(d3.extent(this.data, (d) => d.date ));
		this.yScale.domain([0, d3.max(this.data, (d) => d.value )]);

		const line = d3.line()
				.x( (d: any) => this.xScale(d.date) )
				.y( (d: any) => this.yScale(d.value) );
		const div = d3.select(element).append('div')
				.attr('class', 'chartTooltip')
				.style('opacity', 0);

		this.chart.append('path')
			.datum(this.data)
			.attr('class', 'line')
			.attr('d', line);

		// Add the scatterplot
		this.chart
        	.selectAll('dot')
	        .data(this.data)
	        .enter().append('circle')
	        .attr('class', 'dot-circle')
	        .attr('r', 3)
	        .attr('cx', (d) => {
	        	return this.xScale(d.date);
	        })
	        .attr('cy', (d) => this.yScale(d.value))
	        .on('mouseover', (d) => {
	        	div.transition()
        			.duration(200)
        			.style('opacity', .9)
        			.style('visibility', 'visible');
        		const displayDate = moment
        							.utc(d.date, 'YYYY-MM-DD HH:mm:ss')
        							.format('MM-DD-YYYY HH:mm:ss');
	        	div.html(formatTime(new Date(displayDate)) + '<br/>'  + d.value)
				    .style('left', (d3.event.layerX  - 40) + 'px')
				    .style('top', (d3.event.layerY + 18) + 'px');
	        })
	        .on('mouseout', (d) => {
	            div.transition()
	            .duration(500)
	            .style('opacity', 0);
	        });

		this.chart
			.append('g')
			.attr('class', 'axis axisX')
			.attr('transform', 'translate(0,' + this.height + ')')
			.call(d3.axisBottom(this.xScale));

		this.chart.append('g')
			.attr('class', 'axis axisY')
			.call(d3.axisLeft(this.yScale))
			.append('text')
			.attr('transform', 'rotate(-90)')
			.attr('y', 20)
			.attr('dy', '.71em')
			.style('text-anchor', 'end');
	}
}
