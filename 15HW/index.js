/*
ДЗ - 15
1. Написать сервер, который на разные url по разному отдает клиенту файлы. 
Например: /stream клиент получает файл в стриме, /file - в обычном режиме. 
Усложнить по желанию, например добавить проверку на размер файла, если большой - то stream.....
*/

const http = require('http');
const fs = require('fs');

http.createServer(function(req, res) {
    if(req.url === '/large') {
        readFileAsStream('large', res);
    } else if(req.url === '/small') {
        readFile('small', res);
    } else if(req.url === '/file') {
        fs.stat('15HW/file.txt', function(err, stats) {
            if(stats.size >= 1000) {
                readFileAsStream('file', res);
                console.log('as stream');
            } else {
                readFile('file', res);
                console.log('as file');
            }
        });
    } else {
        res.end();
    };
}).listen(3000, function(err) {
    console.log('Server are listening');
});

function readFile(fileName, response) {
    fs.readFile(`15HW/${fileName}.txt`, 'utf8', function(err, data) {
        if(err) throw err;
        
        response.end(data);
    })
}

function readFileAsStream(fileName, response) {
    fs.createReadStream(`15HW/${fileName}.txt`, 'utf8').pipe(response);
}

/*
*2. При каждом изменении в коде нам приходится делать рестарт сервера! Как решить эту задачу? 
(Подсказка - посмотреть сторонний модуль). 
При старте сервера мы не можем закрыть терминал - иначе сервер остановится! Как справится с этой проблемой?
*/

