const escapeSpecialChars = text => {
	let formatted = '';
	const chars = [...text];
	chars.forEach(char => {
		switch (char) {
			case ' ':
				formatted += '_';
				break;
			case '-':
				formatted += '--';
				break;
			case '_':
				formatted += '__';
				break;
			case '?':
				formatted += '~q';
				break;
			case '/':
				formatted += '~s';
				break;
			case '%':
				formatted += '~p';
				break;
			case '#':
				formatted += '~h';
				break;
			case '"':
				formatted += '\'\'';
				break;
			default:
				formatted += char;
		}
	});
	return formatted;
};

const unformat = text => {
	let formatted = '';
	const chars = [...text];
	chars.forEach((char, index) => {
		if (chars[index - 1] !== '~') {
			switch (char) {
				case '_':
					formatted += ' ';
					break;
				case '-':
					if (chars[index + 1] === '-') {
						formatted += '-';
					}
					break;
				case '__':
					formatted += '_';
					break;
				case '~':
					switch (chars[index + 1]) {
						case 'q':
							formatted += '?';
							break;
						case 'h':
							formatted += '#';
							break;
						case 'p':
							formatted += '%';
							break;
						case 's':
							formatted += '/';
							break;
						default:
							formatted += char;
					}
					break;
				case '\'\'':
					formatted += '"';
					break;
				default:
					formatted += char;
			}
		}
	});
	return formatted;
};

const urlReducer = (previous, current) => {
	return previous + '/' + escapeSpecialChars(current);
};

const formatText = text => {
	return text.reduce(urlReducer, '');
};

function splitInput(input = '', splitter = ' ') {
	return input.split(splitter);
}

function isValidUrl(string) {
	let url;
	try {
		url = new URL(string);
	} catch (_) {
		return false;
	}

	return true;
}
module.exports = {
	formatText,
	unformat,
	escapeSpecialChars,
	splitInput,
	isValidUrl
};
