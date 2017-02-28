const got = require('got');
const cheerio = require('cheerio');
const entities = require('entities');

const root = 'https://www.auxiliadorapredial.com.br';

const domStuff = $ => ({
  iDataTest: select => $(`.i-${select}`).first().attr('data-test'),
  spanItemProp: itemProp => $(`span[itemprop='${itemProp}']`).first().html()
});

// got(root + '/imovel-aluguel-apartamento-rio-branco-porto-alegre-rs-81109030').then( res => {
got(root + '/imovel-aluguel-apartamento-alto-petropolis-porto-alegre-rs-81110561').then( res => {

  const $ = cheerio.load(res.body);

  const dom = domStuff($);

  const images = (
    $('img.my-prod-image').map( (_, img) => $(img).attr('src') ).toArray()
  );

  const additionalInfo = (
    $('.my-list.lista-caracteristica > li').map( (_, li) => entities.decodeHTML($(li).find('span').eq(1).html())).toArray()
  );

  const address = (
    $('div.my-panel.my-location > .my-panel-body > .col-md-12 > ul.my-list')
      .children()
      .eq(1)
      .children()
      .map( (_, a) => $(a).html())
      .toArray()
      .map( addressPiece => addressPiece.trim())
      .join(', ')
  );

  const placeInfo = {
    price: dom.spanItemProp('price'),
    area: dom.iDataTest('area'),
    bedrooms: dom.iDataTest('quarto'),
    suites: dom.iDataTest('suite'),
    bathrooms: dom.iDataTest('banheiro'),
    garage: dom.iDataTest('vagas'),
    condominio: $('.i-imovel').eq(1).attr('data-test'),
    codigo: dom.spanItemProp('mpn'),
    address,
    images,
    additionalInfo
  };

  console.log(placeInfo);

});
