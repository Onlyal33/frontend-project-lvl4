import 'core-js/stable';
import 'regenerator-runtime/runtime';
import gon from 'gon';
import run from './app/initialize.jsx';

console.log(gon);

run(gon);
