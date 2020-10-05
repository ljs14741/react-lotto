import React from 'react';
import ReactDom from 'react-dom';
import { hot } from 'react-hot-loader/root';

import Lotto from './Lotto';
//위에다 import로 바꿔보자
const Hot = hot(Lotto);


ReactDom.render(<Hot />, document.querySelector('#root'));
ReactDom.render(<Lotto />, document.querySelector('#root'));