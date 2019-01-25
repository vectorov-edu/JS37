/*
	*4. По этой ссылке находятся валюты Приват Банка в виде json. 
	Задание: попробовать с помощью Node, отобразить эти данные у себя в консоли или же вывести в ответ на запрос сервера. 
	Подсказка: нужно посмотреть сторонние модули.
	https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=3&fbclid=IwAR1kqe805jievnU8CXahPMpgc31pi7lFPvKRxBToxmJjs-ZPPxVuV9K5M5A
*/
const https = require('https');
const http = require('http');
const fs = require('fs');
const url = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=3&fbclid=IwAR1kqe805jievnU8CXahPMpgc31pi7lFPvKRxBToxmJjs-ZPPxVuV9K5M5A';


http.createServer(function(req, resClient) {
	if(resClient.url === '/') {
		resClient.setHeader('content-type', 'text/html');
		fs.readFile('14HW/currency.html', 'utf8', function(err, data) {
			if(err) throw err;
			resClient.end(data);
		});
	}

	if(resClient.url === '/currency') {
		https.get(url, function(res) {
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
}).listen(3000, function() {
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