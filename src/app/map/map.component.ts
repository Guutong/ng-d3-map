import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { countries } from './countries';

@Component({
  selector: 'app-map',
  templateUrl: './map.svg',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const tooltip = d3.select(".tooltips")
      .append("div")
      .style("z-index", "1000")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background-color", "white")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .html("<div style='display: flex; border-radius: 10px; box-shadow: 0 0 10px #e9e9e9; padding: 10px;'><div style='display: flex;'><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_Thailand.svg/510px-Flag_of_Thailand.svg.png' style='width: 40px; height: 40px; object-fit: cover;' /></div><div style='display: flex; flex-direction: column; margin-left: 10px;'><span style='color: #3c3c3c'>Thailand</span><span style='font-weight: bold;'>40% (54,049)</span></div></div>");
    d3.select('svg')
      .selectAll('polyline')
      .style('cursor', 'pointer')
      .on("mouseover", (select) => {
        const countryISO = select.target.className.baseVal;
        const country = countries.find((c) => c['alpha-3'] === countryISO) || { name: '-', 'alpha-2': '-', 'alpha-3': '-'};
        d3.select('svg').selectAll(`.${countryISO}`).style('fill', '#188D4A');
        tooltip
          .html(`<div style='display: flex; border-radius: 10px; box-shadow: 0 0 10px #e9e9e9; padding: 10px;'><div style='display: flex;'><img src='https://www.countryflags.io/${country['alpha-2'].toLowerCase()}/flat/64.png' style='width: 40px; height: 40px; object-fit: cover;' /></div><div style='display: flex; flex-direction: column; margin-left: 10px;'><span style='color: #3c3c3c'>${country.name}</span><span style='font-weight: bold;'>99% (99,999)</span></div></div>`)
          .style("visibility", "visible");
      })
      .on("mousemove", (event) => {
        tooltip.style("top", (event.pageY) + "px").style("left", (event.pageX) + "px");
      })
      .on("mouseout", (select) => {
        d3.select('svg').selectAll(`.${select.target.className.baseVal}`).style('fill', '#1FBC62');
        tooltip.style("visibility", "hidden");
      });
  }

}
