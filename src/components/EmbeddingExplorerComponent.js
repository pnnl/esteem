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

import {connect} from 'react-redux';

require('styles/EmbeddingExplorer.scss');

import {loadModelNames, loadModel} from '../actions';

import NavBarContainer from './containers/NavBarContainer.js';
import WordListContainer from './containers/WordListContainer.js';
import ControlsContainer from './containers/ControlsContainer.js';

class EmbeddingExplorerComponent extends React.Component {
  componentDidMount () {
    this.props.init();
  }

  render () {
    return (
      <div className='embeddingexplorer-component container-fluid'>
        <NavBarContainer/>
        <div className='row'>
          <div className='col-lg-3'>
            <WordListContainer/>
          </div>
          <div className='col-lg-9'>
            <ControlsContainer />
          </div>
        </div>
      </div>
    );
  }
}

EmbeddingExplorerComponent.displayName = 'EmbeddingExplorerComponent';

// Uncomment properties you need
// EmbeddingExplorerComponent.propTypes = {};
// EmbeddingExplorerComponent.defaultProps = {};

export default connect(
  null,
  (dispatch, {model}) => ({
    init: () => {
      dispatch(loadModelNames());
    }
  }),
  null,
  {pure: false}
)(EmbeddingExplorerComponent);
