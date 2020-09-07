const alfy = require('alfy');
const {splitInput, formatText} = require('./helper');

const BASE_URL = 'https://api.memegen.link/'
const maxAge = 7 * 60 * 60 * 1000 // 1 Week
const data = await alfy.fetch(BASE_URL + 'templates', {maxAge});

const [input, ...splitText] = splitInput(alfy.input, ':')

const generateUrl = (key) => {
  return BASE_URL + `images/${key}${formatText(splitText)}`
}

const textReducer = (previous, current, index) => {
  return `${previous}${current ? (index + 1) + ': ' + current + ', ' : ''}`
}

const getSubtitle = (title) => {
  if (!splitText || splitText.length === 0 || splitText[0] === '') return `Add text to generate ${title} meme`
  return splitText.reduce(textReducer, '')
}

const getSampleText = (sample) => {
  if (!splitText || splitText.length === 0 || splitText[0] === '') return `Add text to generate ${title} meme`
  return splitText.reduce(textReducer, '')
}

const matchFunction = ({name, key}, input) => {
  return name.includes(input) || key.includes(input)
}
const items = alfy
.matches(input, data, matchFunction)
.map(({name, blank, source, sample, key}) => ({
	title: name,
	autocomplete: key + ':',
	subtitle: getSubtitle(key),
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
