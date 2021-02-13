const got = require('got');
const clipboardy = require('clipboardy');
const {splitInput, escapeSpecialChars, isValidUrl} = require('./helper');

const {BASE_URL = 'https://api.memegen.link/', SPLITTER = ';'} = process.env;
const [command, ...text] = splitInput(process.argv[2], SPLITTER); // query

(async () => {
	try {
		const clipboardContent = clipboardy.readSync();

		if (isValidUrl(clipboardContent)) {
			const text_lines = text.map(escapeSpecialChars);
			const body = JSON.stringify({
				image_url: clipboardContent,
				text_lines,
				extension: 'png',
				redirect: false
			});

			const res = await got(BASE_URL + 'templates/custom', {
				method: 'POST',
				body,
				headers: {
					accept: 'application/json',
					'Content-Type': 'application/json'
				}
			});
			console.log(JSON.parse(res.body.replace(/__/g, '_')).url);
			return;
		}
		console.log('no valid url');
		return;
	} catch (err) {
		console.log('err', err);
		return;
	}
})();
