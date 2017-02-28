require('value-box/path')(__dirname, ['/values']);

const fetch = require('./fetch');
const scrappers = require('./scrapping');
const pocs = require('./pocs');

const data =
  () =>
    pocs
      .map(p => ({
        fetch: fetch(scrappers[p.name]),
        targets: p.endpoints.map(e => p.root + e)
      }))
      .map( p => p.targets.map(p.fetch));


Promise.all(
  data().reduce( (all, p) => all.concat(p), [])
).then(console.log);
