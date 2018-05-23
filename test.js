'use strict';

require('babel-register');

const app = require('./config/application');

app.init(() => {
  console.log('Initialized test automation');
});