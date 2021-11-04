import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';

// import gon from 'gon';
import run from './app/initialize.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

// console.log(gon);
run({ channels: [], messages: [], currentChannelId: 0 });
// run(gon);
