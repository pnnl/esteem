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

require('styles/presenters/RangeSlider.scss');

const RangeSliderComponent = ({value, onChange=Object, min=1, max=10}) => (
  <div className='rangeslider-component'>
    <i
      className='fa fa-minus-square-o'
      onClick={() => onChange(Math.max(min, value - 1))}
    />
    <input
      type='range'
      min={min}
      max={max}
      value={value}
      onChange={ev => onChange(Number(ev.target.value))}
    />
    <i
      className='fa fa-plus-square-o'
      onClick={() => onChange(Math.min(max, value + 1))}
    />
    <span className='value'>{value}</span>
  </div>
);

RangeSliderComponent.displayName = 'PresentersRangeSliderComponent';

// Uncomment properties you need
// RangeSliderComponent.propTypes = {};
// RangeSliderComponent.defaultProps = {};

export default RangeSliderComponent;
