const domHelpers = require('./dom');

const domHelpersExtended = ({ attr, first, html, byProp }) => ({
  iDataTest: select => attr(first(`.i-${select}`))('data-test'),
  spanItemProp: itemProp => html(first(byProp('span', 'itemprop', itemProp)))
});

module.exports =
  $ => {
    const { all, allMapped, find, html, toAttr, existing, nth } = dom = domHelpers($);
    const { iDataTest, spanItemProp } = domHelpersExtended(dom);

    const images = (
      allMapped('img.my-prod-image')
        .map(toAttr('src'))
        .filter(existing)
    );

    const additionalInfo = (
      allMapped('.my-list.lista-caracteristica > li')
        .map(find('span'))
        .map(nth(1))
        .map(html)
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
      price: spanItemProp('price'),
      area: iDataTest('area'),
      bedrooms: iDataTest('quarto'),
      suites: iDataTest('suite'),
      bathrooms: iDataTest('banheiro'),
      garage: iDataTest('vagas'),
      condominio: $('.i-imovel').eq(1).attr('data-test'),
      codigo: spanItemProp('mpn'),
      address,
      images,
      additionalInfo
    };

    return placeInfo;
  };
