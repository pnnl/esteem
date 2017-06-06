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


import {connect} from 'react-redux';

import {List} from 'Immutable';

const d3 = require('d3');

import {addWord} from 'actions';

import ChartComponent from '../presenters/ChartComponent.js';

import WordEmbeddingChart from '../presenters/WordEmbeddingChart.js';

function invertNeighbors (data=[], knn=3, word='default', result={}) {
  data.forEach((d, t) => {
    d.slice(0, knn).forEach(e => {
      const times = result[e] = result[e] || {};
      times[t] = (times[t] || []);
      times[t].push(word);
    });
  });
  return result;
}

function getFill (wordList, regions) {
  return d => {
    if (d.unique.length === 1) {
      const word = d.unique[0];
      const region = wordList.getIn([word, 'region']);
      return regions.getIn([region, 'color']);
    }
  };
}

export const SingleEmbedding = connect(
  ({regions=Map(), wordList, knn}, {word, margin, wordHeight=15}) => {
    const data = wordList.getIn([word, 'neighbors'], List()).toJS();
    const invertedData = invertNeighbors(data, knn, word);
    const times = [...wordList.getIn([word, 'times'], []).map(d => new Date(d))];

    return {
      margin, times,
      callback: WordEmbeddingChart,
      height: wordHeight*d3.keys(invertedData).length,
      fill: getFill(wordList, regions),
      data: invertedData
    }
  },
  dispatch => ({
    onClick: d => dispatch(addWord(d.key))
  }),
  null,
  {pure: false}
)(ChartComponent);

export const CombinedEmbedding = connect(
  ({wordList, regions=Map(), knn, selection}, {margin, wordHeight=15}) => {
    // todo: replace with reselect
    const invertedData = {};
    let times = [];

    selection.forEach(word => {
      const data = wordList.getIn([word, 'neighbors'], List()).toJS();
      times = [...wordList.getIn([word, 'times'], []).map(d => new Date(d))];
      invertNeighbors(data, knn, word, invertedData);
    });

    return {
      margin, times,
      callback: WordEmbeddingChart,
      height: wordHeight*d3.keys(invertedData).length,
      fill: getFill(wordList, regions),
      data: invertedData
    }
  },
  dispatch => ({
    onClick: d => dispatch(addWord(d.key))
  }),
  null,
  {pure: false}
)(ChartComponent);