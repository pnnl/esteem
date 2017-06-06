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


import React from 'react';
import {connect} from 'react-redux';

import {combineWords, setKnn} from 'actions';

import RangeSliderComponent from '../presenters/RangeSliderComponent.js';
import CheckboxComponent from '../presenters/CheckboxComponent.js';

import EmbeddingGridContainer from './EmbeddingGridContainer.js';
import {CombinedEmbedding} from './EmbeddingChartContainer.js';

import DisclaimerComponent from '../presenters/DisclaimerComponent.js';

const CheckboxContainer = connect(
  ({combined}) => ({
    isChecked: combined,
    title: 'Combine Charts'
  }),
  dispatch => ({
    onChange: value => dispatch(combineWords(value))
  })
)(CheckboxComponent);

const RangeSliderContainer = connect(
  ({knn}) => ({
    value: knn
  }),
  dispatch => ({
    onChange: value => dispatch(setKnn(value))
  })
)(RangeSliderComponent);

const ControlsComponent = ({isVisible, isCombined}) => (
  <div>
  {
    !isVisible &&
      <DisclaimerComponent />
  }
  {
    isVisible &&
      <div className='form form-group-inline'>
        <CheckboxContainer />
        <div className='pull-right'>
          <RangeSliderContainer name='knn'/>
        </div>
      </div>
  }
  {
    isVisible && isCombined &&
      <div className='wordembedding-component'>
        <CombinedEmbedding margin={{left: 85, top: 20}}/>
      </div>
  }
  {
    isVisible && !isCombined &&
      <EmbeddingGridContainer/>
  }
  </div>
);

export default connect(
  ({wordList, combined}) => ({
    isVisible: wordList.size > 0,
    isCombined: combined
  })
)(ControlsComponent);