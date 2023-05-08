import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3v4';
import * as firstModel from '../../assets/first20_usa.json';


@Component({
  selector: 'app-usa-map',
  templateUrl: './usa-map.component.html',
  styleUrls: ['./usa-map.component.scss']
})
export class UsaMapComponent implements OnInit {

  firstModelData = firstModel['default'];
  title = 'd3-animated-map';

  ngOnInit() {

    this.setMap(1000, 600, this.firstModelData)
  }

 setMap(width, height, dataset) {

    const margin = {top: 10, right: 30, bottom: 10, left: 30};
    width = width - margin.left - margin.right;
    height = height - margin.top - margin.bottom;

    const color_domain = [2.5, 4, 7, 9, 10];

    const color_legend = d3.scaleThreshold<string>()
    .range(['#fee5d9', '#fcbba1', '#fc9272', '#fb6a4a', '#de2d26', '#a50f15'])
    .domain(color_domain);

    const projection = d3.geoMercator()
                      .rotate([-11, 0])
                      .scale(1)
                      .translate([0, 0]);

    const path = d3.geoPath().projection(projection);

    const svg = d3.select('.usa-map')
                .append('svg')
                .attr('viewBox', '0 0 1000 600')
                .attr('preserveAspectRatio', 'xMidYMid')
                .style('max-width', 1200)
                .style('margin', 'auto')
                .style('display', 'flex');

    const b = path.bounds(dataset),
    s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0]  [1]) / height),
    t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];
    projection.scale(s).translate(t);

    svg.selectAll('path')
      .data(dataset.features)
      .enter()
      .append('path')
      .attr('d', path)
      .style('fill', function(d) {
        const value = d['Change_f'];
          if (value) {  
            return color_legend(d['Change_f']);
          } else {
            return '#ccc';
          }
      })
      .style('stroke', '#fff')
      .style('stroke-width', '0.5')
  }
}
