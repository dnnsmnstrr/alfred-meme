const got = require('got');
const clipboardy = require('clipboardy');
const {splitInput, formatText} = require('./helper');

const query = process.argv[2]; // query
const {BASE_URL} = process.env; // environment variables

(async () => {
	try {
		const clipboardContent = clipboardy.readSync();
		if (isVal) {

		}
		await got(BASE_URL + '/templates/custom', {
    	method: 'POST',
			body: {
				image_url: 'https://profile-images.xing.com/images/060e4819a7a8b9c684e98a61751b84d7-3/sarah-niedrich.256x256.jpg',
				text_lines: [
					'', 'lol'
				],
				extension: 'string',
				redirect: true
			},
    	headers: {
    		accept: 'application/json',
    		'Content-Type': 'application/json'
    	}
  	});
	} catch (error) {
		console.log('err', err);
	}
})();
