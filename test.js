import test from 'ava';
import alfyTest from 'alfy-test';
import {format} from './helper';

test(async t => {
	const alfy = alfyTest();
	const result = await alfy('Rainbow');

	t.deepEqual(result, [
		{
			title: 'Unicorn',
			subtitle: 'Rainbow'
		}
	]);
});

test('should correctly escape special characters', t => {
	const specialChars = [' ', '_', '-', '?', '%', '#', '/', '"'];
	let formatted = specialChars.map(format);
	console.log('formatted', formatted);
	t.deepEqual(formatted, ['_', '__', '--', '~q', '~p', '~h', '~s', '\'\'']);
});
