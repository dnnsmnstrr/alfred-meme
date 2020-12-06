import test from 'ava'
import alfyTest from 'alfy-test'

test('should filter templates', async t => {
  const alfy = alfyTest()
  const result = await alfy('mordor')

  t.deepEqual(result, [
    {
      title: 'One Does Not Simply Walk into Mordor',
      autocomplete: 'mordor',
      subtitle: 'Add text to generate \'mordor\' meme',
      arg: 'https://api.memegen.link/images/mordor',
      mods: {
        alt: {
          arg: 'http://knowyourmeme.com/memes/one-does-not-simply-walk-into-mordor',
          subtitle: 'Show source'
        },
        ctrl: {
          arg: 'https://api.memegen.link/images/mordor',
          subtitle: 'Show sample'
        }
      },
      uid: 'mordor'
    }
  ])
})
