﻿const fs = require('fs');

/*
 1. С помощью модуля fs научится записывать данные в файл, а также читать из файла.
*/
// readFileToConsole();
// writeFile('New string2 \n');
// readFileToConsole();

/*
 *2. Используя модуль fs, сделать так, чтоб информация в файл дописывалась с новой строки(добавлялась), а не заменялась.
*/

// readFileToConsole();
// writeFile('New string3 \n', true);
// readFileToConsole();


//==========================================================================
function readFileToConsole() {
	fs.readFile('demo_data.txt', 'utf8', function(err, data) {
		if(err) throw err;
		console.log(data);
	});
}

function writeFile(dataToWrite, isAppending) {
	const flag = isAppending ? {flag: 'a'} : undefined;
	fs.writeFile('demo_data.txt', dataToWrite, flag, function(err) {
		if(err) throw err;
	});
}
