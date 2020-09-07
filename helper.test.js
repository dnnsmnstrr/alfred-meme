import test from 'ava';
import {formatText, escapeSpecialChars, splitInput} from './helper';

test('should correctly escape special characters', t => {
	const specialChars = [' ', '_', '-', '?', '%', '#', '/', '"'];
	let formatted = specialChars.map(escapeSpecialChars);
	t.deepEqual(formatted, ['_', '__', '--', '~q', '~p', '~h', '~s', '\'\'']);
});

test('should format text inputs', t => {
	const [, ...splitText] = splitInput('meme:is this:a crappy meme?', ':');
	t.deepEqual(splitText, ['is this', 'a crappy meme?']);
	let formatted = formatText(splitText);
	t.is(formatted, '/is_this/a_crappy_meme~q');
});
