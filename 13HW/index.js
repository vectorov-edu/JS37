const fs = require('fs');

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

/*
 **3. Отправить себе на почту письмо с помощью Node.js
*/

const nodemailer = require('nodemailer');

nodemailer.createTestAccount(function(err, account) {
	if (err) {
		console.error('Failed to create a testing account. ' + err.message);
		return process.exit(1);
	}
console.log(account);
	// create reusable transporter object using the default SMTP transport
	const transporter = nodemailer.createTransport({
		host: account.smtp.host,
		port: account.smtp.port,
		secure: account.smtp.secure,
		auth: {
			user: account.user, // generated ethereal user
			pass: account.pass // generated ethereal password
		}
	});
		
	const message = {
		from: 'mail@example.com',
		to: 'mail@example.com',
		subject: 'Sending Email from me',
		text: 'Hello to myself!',
		html: '<p><b>Hello</b> to myself!</p>'
	};

	transporter.sendMail(message, function(error, info){
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
			console.log(info);
			console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
		}
	});
});

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
