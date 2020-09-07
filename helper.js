const format = text => {
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

module.exports = {
	format
};
