import React from 'react';
import ReactDOM from 'react-dom';
import Jetski, { configure } from 'jetski';
import config from './config';

const store = configure(config);

ReactDOM.render(
  <Jetski store={store} />,
  document.getElementById('root')
);