/*

Copyright 2017 Pacific Northwest National Laboratory

Permission is hereby granted, free of charge, to any person obtaining a copy of 
this software and associated documentation files (the 'Software'), to deal in 
the Software without restriction, including without limitation the rights to 
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies 
of the Software, and to permit persons to whom the Software is furnished to do 
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all 
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE 
SOFTWARE.

*/


import React from 'react';

import SearchBarContainer from '../containers/SearchBarContainer.js';
import RegionChecklistContainer from '../containers/RegionChecklistContainer.js';

import 'bootstrap/dist/css/bootstrap.css';

const ChecklistItem = ({data}) =>
  <div>
    <i className='fa fa-fw fa-check' style={{visibility: data.get('selected') ? 'inherit' : 'hidden'}}/>
    <span style={{color: data.get('color')}}>
      {data.get('name')}
    </span>
  </div>

const NavBarComponent = ({isLoading, model, modelNames=[], onClick}) => (
  <nav className='navbar navbar-toggleable-md navbar-inverse bg-primary'>

    <a className='navbar-brand' href='#'>ESTEEM</a>

    <ul className='navbar-nav mr-auto'>
        { modelNames.map(d =>
            <li
              key={d}
              className={'nav-item' + (d === model ? ' active': '')}
            >
              <a
                key={d}
                href='#'
                className='nav-link'
                onClick={() => onClick(d)}
              >
                {d}
              </a>
            </li>
          )
        }
    </ul>

    { !isLoading && model &&
      <form className='form-inline my-2 my-lg-0'>
        <RegionChecklistContainer title={'Regions'}>
          <ChecklistItem/>
        </RegionChecklistContainer>
        <SearchBarContainer/>
      </form>
    }
  </nav>
);

export default NavBarComponent;
