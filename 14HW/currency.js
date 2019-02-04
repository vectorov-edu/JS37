/*
	*4. По этой ссылке находятся валюты Приват Банка в виде json. 
	Задание: попробовать с помощью Node, отобразить эти данные у себя в консоли или же вывести в ответ на запрос сервера. 
	Подсказка: нужно посмотреть сторонние модули.
	https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=3&fbclid=IwAR1kqe805jievnU8CXahPMpgc31pi7lFPvKRxBToxmJjs-ZPPxVuV9K5M5A
*/
const https = require('https');
const http = require('http');
const fs = require('fs');
const urlAPI = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=3&fbclid=IwAR1kqe805jievnU8CXahPMpgc31pi7lFPvKRxBToxmJjs-ZPPxVuV9K5M5A';


http.createServer(function(req, resClient) {
	if(req.url === '/') {
		console.log('root');
		resClient.setHeader('content-type', 'text/html');
		fs.createReadStream('14HW/currency.html', 'utf8')
		.on('error', function(err) {
			console.log(err);
		})
		.on('close', function(err) {
			console.log(err);
		})
		.on('data', function(chunk) {
			console.log(chunk);
		})
		.pipe(resClient, {end: true});
		/*fs.readFile('14HW/currency.html', 'utf8', function(err, data) {
			if(err) throw err;
			resClient.end(data);
		});*/
	}

	if(req.url === '/currency') {
		https.get(urlAPI, function(res) {
			let rawData = '';
			res.setEncoding('utf8');
			res.on('data', function(chunk) {
				rawData  += chunk;
			});
		
			res.on('end', function() {
				const currencyArray = JSON.parse(rawData);
				//console.log(currencyArray.length);
				resClient.end(currencyArray);
			});
		});
	}
}).listen(3000, 'localhost', function() {
});

/*
https.get(url, function(res) {
	console.log(res.headers['content-type']);
	let rawData = '';
	res.setEncoding('utf8');
	res.on('data', function(chunk) {
		rawData  += chunk;
	});

	res.on('end', function() {
		const currencyArray = JSON.parse(rawData);
		console.log(currencyArray.length);
	});
});
*/


function getFile(callback) {
	fs.readFile('14HW/currency.html', 'utf8', function(err, data) {
		if(err) throw err;
		console.log(data);
		callback(data);
	});
}