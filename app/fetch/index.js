const cheerio = require('cheerio');
const got = require('got');
const entities = require('entities');

module.exports =
  handler =>
    url =>
      got(url)
        .then(
          res => handler(cheerio.load(res.body))
        );
