/*
*2. При каждом изменении в коде нам приходится делать рестарт сервера! Как решить эту задачу? 
(Подсказка - посмотреть сторонний модуль). 
При старте сервера мы не можем закрыть терминал - иначе сервер остановится! Как справится с этой проблемой?
*/

// This script we can start with 'forever' npm package

var nodemon = require('nodemon');

nodemon({
  script: '15HW/index.js',
});

nodemon.on('start', function () {
    console.log('App has started');
}).on('quit', function () {
    console.log('App has quit');
    process.exit();
}).on('restart', function (files) {
    console.log('App restarted due to: ', files);
});