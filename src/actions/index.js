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


import {fromJS} from 'Immutable';

const d3 = require('d3');

import {initialState} from 'stores';

export function loadModelNames () {
  return dispatch =>
    d3.json('/api/', (err, data) => {
      console.log(data);
      if (!err) {
        data.modelNames.sort();
        
        dispatch({
          type: 'LOAD_JSON_DONE',
          data
        });

        if (data.modelNames.length > 0) {
          dispatch(loadModel(data.modelNames[0]));
        }
      } else {
        console.err(err);
      }
    });
}

export function loadModel (model) {
  return dispatch => {
    // set the display name
    dispatch({type: 'SET_KEY_VALUE', key: 'model', value: model});

    d3.json('/api/' + model, (err, data) => {
      if (!err) {
        const {vocab, regions} = data;
        dispatch({
          type: 'LOAD_JSON_DONE',
          data: {
            ...initialState,
            vocab,
            regions: fromJS(regions)
          }
        });
      } else {
        console.log(err);
      }
    });
  }
}

export function addWord (word) {
  return (dispatch, getState) => {

    const {model, regions} = getState();

    regions
      .filter(d => d.get('selected'))
      .forEach(region => {
        const region_name = region.get('name')
        const name = word + ' (' + region_name  + ')';
        // dispatch an action to set the word to null while loading
        dispatch({
          type: 'OPERATION',
          name: 'wordList',
          action: 'set',
          args: [name, fromJS({word, region: region_name})]
        });

        d3.json('/api/' + model + '/' + region_name + '/'+ word, (err, data) => {

          // once it has loaded update it
          dispatch({
            type: 'OPERATION',
            name: 'wordList',
            action: 'set',
            args: [name, fromJS(data)]
          });
        });
      });
  }
}

export function selectWord(word) {
  return {
    type: 'OPERATION',
    name: 'selection',
    action: 'add',
    args: [word]
  }
}

export function unselectWord(word) {
  return {
    type: 'OPERATION',
    name: 'selection',
    action: 'delete',
    args: [word]
  }
}

export function removeWord(word) {
  return {
    type: 'OPERATION',
    name: 'wordList',
    action: 'delete',
    args: [word]
  }
}

export function combineWords (value) {
  return {
    type: 'SET_KEY_VALUE',
    key: 'combined',
    value
  };
}

export function setKnn (value) {
  return {
    type: 'SET_KEY_VALUE',
    key: 'knn',
    value
  };
}

export function toggleRegionSelected (region) {
  return {
    type: 'TOGGLE_AT_PATH',
    name: 'regions',
    path: [region, 'selected']
  };
}

export default function (state, action) {
  console.log(state);
  console.log(action);
  switch (action.type) {
    case 'LOAD_JSON_DONE':
      return {...state, ...action.data};

    case 'OPERATION': {
      const nextState = {...state};
      nextState[action.name] = nextState[action.name][action.action](...action.args);
      return nextState;
    }

    case 'SET_KEY_VALUE': {
      const nextState = {...state};
      nextState[action.key] = action.value;
      return nextState;
    }

    case 'MERGE_KEY_VALUE': {
      const nextState = {...state};
      nextState[action.key] = {...nextState[action.key], ...action.value};
      return nextState;
    }

    case 'TOGGLE_AT_PATH': {
      const {path, name} = action;
      const nextState = {...state};
      nextState[name] = nextState[name].updateIn(path, d => !d);
      return nextState;
    }
  }
  return state;
}
