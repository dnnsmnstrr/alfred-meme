const alfy = require('alfy');
const {splitInput, formatText, unformat} = require('./helper');

const BASE_URL = 'https://api.memegen.link/'
const SPLITTER = ';'
const maxAge = 7 * 24 * 60 * 60 * 1000 // 1 Week
const data = await alfy.fetch(BASE_URL + 'templates', {maxAge});

const [input, ...splitText] = splitInput(alfy.input, SPLITTER)

const generateUrl = (key) => {
  return BASE_URL + `images/${key}${formatText(splitText)}`
}

const textReducer = (previous, current, index) => {
  return `${previous}${current ? (index + 1) + ': ' + current + ', ' : ''}`
}

const getSubtitle = (title) => {
  if (!splitText || splitText.length === 0 || (splitText.length < 2 && splitText[0] === '')) return `Add text to generate ${title} meme`
  return splitText.reduce(textReducer, '')
}

const getSampleText = (sample) => {
  const sampleTexts = sample.split('/').slice(5)
  let sampleText = ''
  for (var i = 0; i <= splitText.length; i++) {
    if (sampleTexts[i]) {
      sampleText += SPLITTER + unformat(sampleTexts[i].replace('.png', ''));
    }
  }
  return sampleText
}

const matchFunction = ({name, key}, input) => {
  return key.includes(input) || name.toLowerCase().includes(input)
}
const items = alfy
.matches(input, data, matchFunction)
.map(({name, blank, source, sample, key}) => ({
	title: name,
	autocomplete: input !== key ? key + SPLITTER : key + getSampleText(sample),
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
      quicklookurl: sample,
    }
  }
}));

alfy.output(items);
