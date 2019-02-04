/*
ДЗ - 14
1. Написать сервер, чтоб по запросу localhost:3000 сервер выдавал нам в response Hello World, 
чтоб по запросу localhost:3000/about сервер выдавал нам данные о запросе в консоль, 
а по запросу localhost:3000/stop - останавливаем его. 
Усложнить, что по запросу localhost:3000/contact сервер возвращал страницу index.html.


2. На основе событий создать свой логер(logger). 
Который будет регистрировать пользователя со временем посещения и выводит эти данные в консоль. 
Также можно добавить информацию типа (такой то пользователь вошёл и вышел), набросать событий типа logIn, logout, someAction…. 
Код произвольный(абстрактный), главное использовать события класса EventEmitter.
*/

http = require('http');
fs = require('fs');

http.createServer(function(req, res) {
    if(req.url === '/about') {
        res.end(req.url);
        console.log(req.url);
    } else if(req.url === '/stop') {
        console.log('server stopped');
        this.close();
        process.exit(0);
    } else if(req.url === '/contact') {
        fs.createReadStream('14HW/index.html', 'utf8').pipe(res);
    } else {
        res.end('Hello, World');
    }
}).listen(3000, 'localhost', function(err) {
    if(err) throw err;

    console.log('Server has started');
});