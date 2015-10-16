/* jshint node:true, esnext:true, undef:true, unused:true, laxcomma:true */
'use strict';

var open    = require('open')
,   program = require('commander')
,   cron    = require('node-schedule');

program
    .version('0.0.1')
    .usage('<hour>')
    .option('-p --player', 'Player')
.action(function (hour, player) {
    if(!(player instanceof Object)){ // Option given. Invert params
        var _tmp = player;
        player = hour;
        hour = _tmp;
    } else { // Option not given, take default
        player = 'http://www.radioacktiva.com/player';
    }

    var timeRegex = /\d+:\d+/;
    var time = (
        hour.match(timeRegex) ?
        (function (times) {
            return [ times[1], times[0], '*', '*', '*' ].join(' ');
        })(hour.split(':')) : '45 5 * * *'
    );

    console.log(time);
    cron.scheduleJob(time, function () {
        open(player, function () {
            process.exit();
        });
    });

});

program.parse(process.argv);
