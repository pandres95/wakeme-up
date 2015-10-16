#! /usr/bin/env node
'use strict';

require('daemon')();
console.log(process.argv);
require('..');
