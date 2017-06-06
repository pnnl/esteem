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

import React from 'react';

const d3 = require('d3');

class ChartComponent extends React.Component {
  componentDidUpdate () {
    const {callback, margin={}, ...rest} = this.props;
    const {top=0, left=0, bottom=0, right=0} = margin;
    let {width, height} = this.svg.getBoundingClientRect();
    
    width = width - left - right;
    height = height - top - bottom;

    if (callback) {
      d3.select(this.svg)
        .select('g.chart')
          .attr('transform', 'translate(' + [left, top] + ')')
          .call(callback, {...rest, margin, width, height, tooltip: this.tooltip});
    }
  }

  render () {
    const {width, height} = this.props;
    return (
      <div>
        <div className='chart-tooltip' ref={div => {this.tooltip = div;}}/>
        <svg
          width={width}
          height={height}
          ref={svg => {this.svg = svg;}}
        >
          <g className='chart'/>
        </svg>
      </div>
    );
  }
}

ChartComponent.displayName = 'ChartComponent';

// Uncomment properties you need
// ChartComponent.propTypes = {};
// ChartComponent.defaultProps = {};

export default ChartComponent;
