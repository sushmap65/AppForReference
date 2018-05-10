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
  selector: 'donut-chart',
  templateUrl: './donutchart.component.html',
  styleUrls: ['./donutchart.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class DonutChartComponent {
	@ViewChild('chart') private chartContainer: ElementRef;
	@Input() private data: Array<{date: Date, value: number}>;
	private margin: any = { top: 20, bottom: 20, left: 20, right: 20};
	private chart: any;
	private dataset: any;
	private width: number;
	private height: number;
	private radius: number;
	private xScale: any;
	private yScale: any;
	private colors: any;
	private xAxis: any;
	private yAxis: any;

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
		this.radius = Math.min(this.width, this.height) / 2;
		// const color = d3.scaleOrdinal(d3.schemeCategory20c);
		const color = d3.scaleOrdinal()
    			.range(['#FAB500' , '#FADE79']);
		this.dataset = [
				{sala: 'Sales', value: 74},
				{sala: 'Service Parts', value: 85},
        ];
		// const color = d3.scaleLinear()
		// 				.domain([0, this.dataset.length])
		// 				.range(<any[]> ['#FFF59D' , '#F9AB25']);

		const tooltip = d3.select(element)
						.append('div')
						.attr('class', 'tooltip');
		tooltip.append('div')
				.attr('class', 'label');

		tooltip.append('div')
				.attr('class', 'count');

		tooltip.append('div')
					.attr('class', 'percent');

		this.chart = d3.select(element).append('svg')
					  .attr('width', this.width)
					  .attr('height', this.height)
					  .append('g')
			          .attr('transform', 'translate(' + (this.width / 2) + ',' + (this.height / 2) + ')');

		const donutWidth = 30;

		const arc = d3.arc()
				  .innerRadius(this.radius - donutWidth)
				  .outerRadius(this.radius);

		const pie = d3.pie().value((d: any) => d.value )
		          .sort(null);
		const legendRectSize = 18;
		const legendSpacing = 4;
		const pieData = pie(this.dataset);
		const path = this.chart.selectAll('path')
		          .data(pieData)
		          .enter()
		          .append('path')
		          .attr('d', arc)
		          .attr('fill', (d, i) => color(d.data.sala) );

		path.on('mouseover', (d) => {
			const total = d3.sum(this.dataset.map( () => d.value));

			const percent = Math.round(1000 * d.data.value / total) / 10;
			tooltip.select('.label').html(d.data.sala);
			tooltip.select('.count').html(d.data.value);
			tooltip.select('.percent').html(percent + '%');
			tooltip.style('display', 'block');
		});

		path.on('mouseout', () => {
				tooltip.style('display', 'none');
		});

		const legend = this.chart.selectAll('.legend')
					  .data(color.domain())
					  .enter()
					  .append('g')
					  .attr('class', 'legend')
					  .attr('transform', (d, i) => {
					    const height = legendRectSize + legendSpacing;
					    const offset =  height * color.domain().length / 2;
					    const horz = -2 * legendRectSize;
					    const vert = i * height - offset;
					    return 'translate(' + horz + ',' + vert + ')';
					  });

		legend.append('rect')
		.attr('width', legendRectSize)
		.attr('height', legendRectSize)
		.style('fill', color)
		.style('stroke', color);

		legend.append('text')
		.attr('x', legendRectSize + legendSpacing)
		.attr('y', legendRectSize - legendSpacing)
		.text( (d) => d );
	}

  	public updateChart() {
		// update scales & axis
		this.xScale.domain(this.data.map((d) => d[0]));
		this.yScale.domain([0, d3.max(this.data, (d) => d[1])]);
		this.colors.domain([0, this.data.length]);

		const update = this.chart.selectAll('.bar')
		  .data(this.data);

		// remove exiting bars
		update.exit().remove();

		// update existing bars
		this.chart.selectAll('.bar').transition()
		  .attr('x', (d) => this.xScale(d[0]))
		  .attr('y', (d) => this.yScale(d[1]))
		  .attr('width', (d) => this.xScale.bandwidth())
		  .attr('height', (d) => this.height - this.yScale(d[1]))
		  .style('fill', (d, i) => this.colors(i));

		// add new bars
		update
		  .enter()
		  .append('rect')
		  .attr('class', 'bar')
		  .attr('x', (d) => this.xScale(d[0]))
		  .attr('y', (d) => this.yScale(0))
		  .attr('width', this.xScale.bandwidth())
		  .attr('height', 0)
		  .style('fill', (d, i) => this.colors(i))
		  .transition()
		  .delay((d, i) => i * 10)
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
				);
	}
}
