const alfy = require('alfy');
const {format} = require('./helper');

const BASE_URL = 'https://api.memegen.link/'
const maxAge = 7 * 60 * 60 * 1000 // 1 Week
const data = await alfy.fetch(BASE_URL + 'templates', {maxAge});

const [input, ...restInput] = alfy.input.split(':')

const urlReducer = (previous, current) => {
  return previous + '/' + format(current)
}
const generateUrl = (key) => {
  return BASE_URL + `images/${key}${restInput.reduce(urlReducer, '')}`
}

const textReducer = (previous, current, index) => {
  return `${previous}${current ? (index + 1) + ': ' + current + ', ' : ''}`
}

const getSubtitle = (name) => {
  if (!restInput || restInput.length === 0 || restInput[0] === '') return `Add text to generate ${name} meme`
  return restInput.reduce(textReducer, '')
}

const items = alfy
.matches(input, data, 'name')
.map(({name, blank, source, sample, key}) => ({
	title: name,
	autocomplete: name + ':',
	subtitle: getSubtitle(name),
	arg: generateUrl(key),
  mods: {
    alt: {
      arg: source,
      subtitle: 'Show source',
    },
    ctrl: {
      arg: sample,
      subtitle: 'Show sample',
    }
  }
}));

alfy.output(items);
