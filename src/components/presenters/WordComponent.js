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

require('styles/presenters/Word.scss');

const WordComponent = ({id, word='default', region='default', color='pink', isLoaded=false, isSelected=false, onSelect, onRemove}) => {
  return (
    <div className='word-component'>
      {
        isLoaded &&
        <i
          onClick={() => onSelect && onSelect(id, isSelected)}
          className={'fa fa-fw fa-' + (isSelected ? 'check-square-o' : 'square-o hides')}
        />
      }
      {
        !isLoaded &&
        <i className='fa fa-spinner fa-pulse' />
      }
      <span onClick={() => onSelect && onSelect(id, isSelected)}>
        {word}
      </span>
      {' ('}
      <span style={{color}}>
        {region}
      </span>
      {')'}
      <i
        className='fa fa-minus-circle pull-right remove hides'
        onClick={() => onRemove && onRemove(id)}
      />
    </div>
  );
}

WordComponent.displayName = 'PresentersWordComponent';

// Uncomment properties you need
// WordComponent.propTypes = {};
// WordComponent.defaultProps = {};

export default WordComponent;
