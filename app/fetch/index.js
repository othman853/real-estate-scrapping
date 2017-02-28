const { load } = require('cheerio');
const got = require('got');

module.exports =
  handler => url => got(url).then(res => handler(load(res.body)));
