import {
  Component,
  OnChanges,
  Input,
  ElementRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import * as d3 from 'd3';
import * as Moment from 'moment';

@Component({
  selector: 'groupbar-chart',
  templateUrl: './groupbarchart.component.html',
  styleUrls: ['./groupbarchart.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class GroupBarChartComponent {
	@ViewChild('chart') private chartContainer: ElementRef;
	@Input() private data: Array<{date: Date, value: number}>;
	@Input() private yAxisLabel;
	@Input() private key: any[];
	private margin: any = { top: 20, bottom: 60, left: 40, right: 40};
	private tooltip: any;
	private chart: any;
	private width: number;
	private height: number;
	private xScale: any;
	private yScale: any;
	private xAxis: any;
	private yAxis: any;
	private colors: any;
	private xScale1: any;
	private y: any;
	private z: any;

	public ngOnInit() {
		this.createChart();
		if (this.data) {
		  this.updateChart();
		}
	}

	public ngOnChanges() {
		if (this.chart) {
		  this.updateChart();
		}
	}

	public make_y_gridlines(yScale) {
			return d3.axisLeft(yScale)
			.ticks(5);
	}

	public createChart() {
		const element = this.chartContainer.nativeElement;
		this.width = element.offsetWidth - this.margin.left - this.margin.right;
		this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
		const svg = d3.select(element).append('svg')
		  .attr('width', element.offsetWidth)
		  .attr('height', element.offsetHeight);

		this.tooltip = d3.select(element).append('div').attr('class', 'toolTip');
		const xDomain = this.data.map((d: any) => d.month );
		const yDomain = [0, d3.max(this.data, (d) => {
							return d3.max(this.key, (key) => d[key] );
						})];

		this.xScale = d3.scaleBand()
			.padding(0.2)
			.domain(xDomain)
		    .rangeRound([0, this.width])
		    .paddingInner(0.6);

		this.xScale1 = d3.scaleBand()
					.padding(0);

		this.yScale = d3.scaleLinear()
			.domain(yDomain)
			.rangeRound([this.height, 0])
			.nice();

		// bar colors
		this.colors = d3.scaleOrdinal()
			.range(['#fb8a76' , '#70c8be']);

		// x & y axis
		this.xAxis = svg.append('g')
			.attr('class', 'axis axis-x')
			.attr('transform', `translate(${this.margin.left + 20}, ${this.margin.top + this.height})`)
			.call(d3.axisBottom(this.xScale));

		this.yAxis = svg.append('g')
			.attr('class', 'axis axis-y grid')
			.attr('transform', `translate(${this.margin.left + 20 }, ${this.margin.top})`)
			.call(this.make_y_gridlines(this.yScale)
					.tickSize(-this.width));
		this.yAxis
			.append('text')
			.attr('fill', '#000')
			.attr('transform', 'rotate(-90)')
			.attr('y', -32)
			.attr('dy', '0.91em')
			.attr('text-anchor', 'end')
			.text(this.yAxisLabel);

		// chart plot area
		this.chart = svg.append('g')
			.attr('class', 'bars')
			.attr('transform', `translate(${this.margin.left + 20 },${this.margin.top})`);
		this.xScale1.domain(this.key).rangeRound([0, this.xScale.bandwidth()]);

		const legendHeight = this.height + 40;
		const legend = svg.append('g')
			.attr('class', 'legend')
			.attr('font-family', 'sans-serif')
			.attr('font-size', 10)
			.attr('text-anchor', 'end')
			.selectAll('g')
			.data(this.key.map( (key) => ({key, val: key})))
			.enter().append('g')
			.attr('transform', (d, i) => `translate(${45 * (i + 1) } , ${legendHeight})` );

		legend.append('rect')
		  .attr('x', (d, i) => (i + 1) * 50 )
		  .attr('width', 40)
		  .attr('height', 20)
		  .attr('fill', (d) => this.colors(d.key));

		legend.append('text')
		  .attr('x', (d, i) => (i + 1) * 80)
		  .attr('y', 40)
		  .text((d: any) => d.val);
	}

  	public updateChart() {
		// update scales & axis
		this.xScale.domain(this.data.map((d: any) => d.month));
		this.yScale.domain([0, d3.max(this.data, (d) => {
						return d3.max(this.key, (key) => d[key] );
					})]);
		this.colors.domain([0, this.data.length]);
		const update = this.chart.selectAll('.bar')
		  .data(this.data);

		update
			.append('g')
			.data(this.data)
			.enter().append('g')
			.attr('class', 'axis')
			.attr('transform', (d) => {
			  return 'translate(' + this.xScale(d.month) + ',0)';
			})
			.selectAll('rect')
			.data( (d) => this.key.map((key) => ({key, value: d[key]}) ))
			.enter().append('rect')
			.attr('x', (d) => this.xScale1(d.key) )
			.attr('y', (d) => this.yScale(d.value) )
			.attr('width', this.xScale1.bandwidth(0))
			.attr('height', (d) =>  this.height - this.yScale(d.value))
			.attr('fill', (d) => this.colors(d.key))
			.on('mouseover', (d) => {
			  	this.tooltip
			  		.style('left', d3.event.layerX - 50 + 'px')
			  		.style('top', d3.event.layerY - 70 + 'px')
			  		.style('display', 'inline-block')
			  		.html(d.key + '<br/>' + d.value);
		  	}).on('mouseout', () => {
		  	this.tooltip
		  		.style('display', 'none');
		  });
	}
}
