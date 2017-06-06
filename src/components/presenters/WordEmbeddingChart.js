/*

Copyright 2017 Pacific Northwest National Laboratory

Permission is hereby granted, free of charge, to any person obtaining a copy of 
this software and associated documentation files (the "Software"), to deal in 
the Software without restriction, including without limitation the rights to 
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies 
of the Software, and to permit persons to whom the Software is furnished to do 
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all 
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE 
SOFTWARE.

*/


'use strict';

const d3 = require('d3');

require('styles/presenters/WordEmbedding.scss');

export default function (group, {width=100, height=1000, data=[], times=[], r=4, margin={}, fill, onClick, tooltip}) {
  const layers = group.selectAll('g.layer')
    .data(['wordembedding-chart', 'x axis']);

  layers.enter()
    .append('g')
      .attr('class', d => 'layer ' + d)

  layers.exit()
    .remove();

  const tip = d3.select(tooltip)
    .style('opacity', 0)
    .style('position', 'fixed');

  const {left=0} = margin;

  const words = d3.entries(data)
    .map(({key, value}) => {
      return {
        key,
        unique: [...(new Set(d3.merge(d3.values(value))))],
        value: times.map((_,i) => (value[i] || []).length),
        t0: d3.min(d3.keys(value), Number)
      };
    })
    .sort((a,b) => a.t0 - b.t0);

  const xscale = d3.scaleLinear()
    .domain([0, times.length])
    .range([left, width - 2*r]);

  const xAxis = group.select('.layer.x.axis')
    .selectAll('circle')
      .data(times);

  const timeScale = d3.scaleTime()
    .domain([times[0], times[times.length - 1]])
    .range(xscale.range());

  group.select('.layer.x.axis')
    .call(d3.axisTop(timeScale).ticks(width < 500 ? 2 : null));

  const yscale = d3.scaleLinear()
    .domain([-1, words.length])
    .range([height, 0]);

  words.forEach((d,i) => {
    d.y = yscale(i);
  });

  const hmax = d3.max(words, d => d3.max(d.value));

  const dy = Math.min(Math.abs(yscale(1) - yscale(0))/hmax/3, 5);

  const rows = group.select('.wordembedding-chart').selectAll('g')
    .data(words, d => d.key);

  const rowsEnter = rows.enter()
    .append('g')
      .attr('transform', d => 'translate(' + [width, d.y] + ')')
      .on('click', onClick)
      .on('mouseover', function(d) {
        const x = d3.event.clientX;
        const y = d3.event.clientY;

        tip.transition()    
          .duration(200)
          .style('opacity', .9);

        tip
          .text(d.unique.join(', '))
          .style('left', x + 'px')
          .style('top', (y - 20) + 'px');
      })
      .on('mouseout', () => {
         tip.transition()
           .duration(500)
           .style('opacity', 0);
      });

  rowsEnter
    .append('path');

  rowsEnter
    .append('text')
      .text(d => d.key);

  const rowsMerge = rowsEnter.merge(rows)
    .classed('bigger', d => d3.max(d.value) > 1)
    .style('fill', fill)
    .style('stroke', fill)
    .transition()
      .duration(500)
      .attr('transform', d => 'translate(0,' + d.y + ')');
  
  const area = d3.area()
    .curve(d3.curveStepAfter)
    .x((d,i) => xscale(i))
    .y1(d => d*dy)
    .y0(d => -d*dy);

  rowsMerge
    .select('path')
      .attr('d', d => area(d.value));

  rowsMerge
    .select('text')
      .attr('dx', -2*r)
      .attr('x', d => xscale(d.t0));
    
  rows.exit()
    .transition()
    .duration(500)
      .attr('transform', d => 'translate(' + [-width, d.y] + ')')
      .remove();
}

