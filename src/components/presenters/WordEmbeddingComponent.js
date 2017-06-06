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

require('styles/containers/WordEmbedding.scss');

import {SingleEmbedding} from '../containers/EmbeddingChartContainer.js';
import WordContainer from '../containers/WordContainer.js';

const WordEmbeddingComponent = ({word}) => (
  <div className='card wordembedding-component'>

    <div className='card-block'>
      <WordContainer word={word}/>
    </div>

    <div className='card-img-bottom'>
      <SingleEmbedding word={word} margin={{top: 20, left: 50}}/>
    </div>

  </div>
);

WordEmbeddingComponent.displayName = 'PresentersWordEmbeddingComponent';

// Uncomment properties you need
// WordEmbeddingComponent.propTypes = {};
// WordEmbeddingComponent.defaultProps = {};

export default WordEmbeddingComponent;
