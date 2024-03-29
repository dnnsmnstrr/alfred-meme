const alfy = require('alfy');
const {splitInput, formatText, unformat} = require('./src/helper');
const {BASE_URL = 'https://api.memegen.link/', SPLITTER} = process.env;

const maxAge = 7 * 24 * 60 * 60 * 1000 // 1 Week
const data = await alfy.fetch(BASE_URL + 'templates', { maxAge });

const [input, ...splitText] = splitInput(alfy.input, SPLITTER)

const generateUrl = (key) => {
  return BASE_URL + `images/${key}${formatText(splitText)}`
}

const textReducer = (previous, current, index, items) => {
  return `${previous}${current ? `${index + 1}: "${current}"${index < items.length - 1 ? ', ': ''}` : ''}`
}

const getSubtitle = (title) => {
  if (!splitText || splitText.length === 0 || (splitText.length < 2 && splitText[0] === '')) return `Add text to generate '${title}' meme`
  return splitText.reduce(textReducer, '')
}

const getSampleText = (example = '') => {
  let exampleText = ''
  for (var i = 0; i <= splitText.length; i++) {
    if (example[i]) {
      exampleText += SPLITTER + unformat(example[i].replace('.png', ''));
    }
  }
  return exampleText
}

const matchFunction = ({name, id}, input) => {
  if (!id) {
    return
  }
  return id.includes(input) || name.toLowerCase().includes(input)
}

const items = alfy
.matches(input, data, matchFunction)
.map(({name, blank, source, example, id, styles}) => ({
  uid: id,
	title: name,
	autocomplete: input !== id ? id + SPLITTER : id + getSampleText(example.text),
	subtitle: getSubtitle(example.text),
	arg: generateUrl(id),
  mods: {
    alt: {
      arg: source,
      subtitle: 'Show source',
    },
    ctrl: {
      arg: example,
      subtitle: 'Show example',
      quicklookurl: example,
    },
    ...(styles[0] && {
      fn: {
        arg: generateUrl(id) + '.png?style=' + styles[0],
        subtitle: 'Add style ' + styles[0],
      }
    }),
  }
}));

const custom = {
  title: 'Custom Meme',
  subtitle: 'Create custom meme with image url from clipboard',
  arg: alfy.input,
  autocomplete: 'custom;'
}

alfy.output([...items, custom]);
