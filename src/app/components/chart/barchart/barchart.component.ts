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
  selector: 'bar-chart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class BarChartComponent {
	@ViewChild('chart') private chartContainer: ElementRef;
	@Input() private data: Array<{date: Date, value: number}>;
	@Input() private yAxisLabel;
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
	private myElement: any;
	public svg;
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
		.ticks(6);
	}

	public createChart() {
		const element = this.chartContainer.nativeElement;
		this.myElement = element;
		this.width = element.offsetWidth - this.margin.left - this.margin.right;
		this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
		 this.svg = d3.select(element).append('svg')
		  .attr('width', element.offsetWidth)
		  .attr('height', element.offsetHeight);

		this.tooltip = d3.select(element).append('div').attr('class', 'toolTip');
		// define X & Y domains
		const xDomain = this.data.map((d) => d[0]);
		const yDomain = [0, d3.max(this.data, (d) => d[1])];

				// create scales
		this.xScale = d3.scaleBand()
			.padding(0.2)
			.domain(xDomain)
			.rangeRound([0, this.width])
			.paddingInner(0.8);
		this.yScale = d3.scaleLinear()
			.domain(yDomain)
			.range([this.height, 0]);


		// bar colors
		this.colors = d3.scaleLinear()
						.domain([0, this.data.length])
						.range( ['#fed5cd', '#fb8a76'] as any[]);

		// x & y axis
		this.xAxis = this.svg.append('g')
		  .attr('class', 'axis axis-x')
		  .attr('transform', `translate(${this.margin.left + 20}, ${this.margin.top + this.height})`)
		  .call(d3.axisBottom(this.xScale));
		this.yAxis = this.svg.append('g')
		  .attr('class', 'axis axis-y grid')
		  .attr('transform', `translate(${this.margin.left + 20}, ${this.margin.top})`)
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
		this.chart = this.svg.append('g')
		  .attr('class', 'bars')
		  .attr('transform', `translate(${this.margin.left + 20}, ${this.margin.top})`);
	}

  	public updateChart() {
  		console.log('chart',this.chart);
		// update scales & axis
		const mapData = this.data.map((d) => d[0]);
		console.log('mapData:-', mapData, 'width:-', this.xScale.bandwidth());
		this.xScale.domain(mapData);
		this.yScale.domain([0, d3.max(this.data, (d) => d[1])]);
		this.colors.domain([0, this.data.length]);
		const update = this.chart.selectAll('.bar')
		  .data(this.data);

		// add new bars
		update
		  .enter()
		  .append('rect')
		  // .append('div')
		  .merge(update)
		  .attr('class', 'bar')
		  .attr('x', (d) => {
		  	const su = this.xScale(d[0]);
		  	console.log('x domain:-',d, su );
		  	return su;
		  })
		  .attr('y', (d) => {
		  	const su = this.yScale(0);
		  	console.log('y domain:-',d, su);
		  	return su;
		  }
		  )
		  .attr('width', this.xScale.bandwidth())
		  .attr('height', 0)
		  .style('fill', '#FF677A')
		  .on('mouseover', (d) => {
		  	this.tooltip
		  		.style('left', d3.event.layerX - 50 + 'px')
		  		.style('top', d3.event.layerY - 70 + 'px')
		  		.style('display', 'inline-block')
		  		.html(d[0] + '<br/>' + d[1]);
		  })
		  .on('mouseout', () => {
		  	this.tooltip
		  		.style('display', 'none');
		  })
		  .transition()
		  // .delay((d, i) => i * 10)
		  .attr('y', (d) => this.yScale(d[1]))
		  .attr('height', (d) => this.height - this.yScale(d[1]));

		this.xAxis
			.transition()
			.call(d3.axisBottom(this.xScale));
		// this.yAxis.transition().call(d3.axisLeft(this.yScale));
		this.yAxis
			.transition()
			.call(
				this.make_y_gridlines(this.yScale)
					.tickSize(-this.width)
				)

	    update.exit().remove();

	}
}
	  // const g = this.svg.append("g").attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
	  //  g.selectAll(".text")
   //    .data(this.data)
   //    .enter()
   //    .append("text")
   //    .attr("dx", ".75em")
	  // .attr('x', (d) => {
		 //  	const su = this.xScale(d[0]) + 25;
		 //  	console.log('x domain:-',d, su );
		 //  	return su;
		 //  })
	  // .attr('y', (d) => {
		 //  	const su = this.yScale(d[1]);
		 //  	console.log('x domain:-',d, su );
		 //  	return su;
		 //  })
   //    .attr("text-anchor", "middle")
   //    .text(function(d) { return d[1]; })
   //    .exit().remove();