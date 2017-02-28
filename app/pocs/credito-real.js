const got = require('got');
const cheerio = require('cheerio');
const entities = require('entities');

const domStuff =
  $ => ({
    first: select => $(select).first(),
    html: piece => piece.html() || '',
    substr: text => (begin=0, end) => text.trim().substring(begin, end)
  });

got('https://www.creditoreal.com.br/alugueis/1399/apartamento-com-2-dormitorios-no-bairro-petropolis-em-porto-alegre')
// got('https://www.creditoreal.com.br/alugueis/66061/apartamento-com-1-dormitorio-no-bairro-floresta-em-porto-alegre')
// got('https://www.creditoreal.com.br/alugueis/62124/apartamento-com-2-dormitorios-no-bairro-floresta-em-porto-alegre')
  .then(res => {

    const $ = cheerio.load(res.body);

    const { first, html, substr } = domStuff($);

    const placeInfo = {
      price: first('span.property-detail__price').attr('content'),
      area: substr(html(first('.property-features__item[data-original-title="Área"]')))(0,2),
      bedrooms: substr(html(first('.property-features__item[data-original-title="Dormitórios"]')))(0,1),
      garage: substr(html(first('.property-features__item[data-original-title="Vagas"]')))(0,1),
      hasElevator: Boolean(html(first('.property-features__item[data-original-title="Elevador"]'))),
      bathrooms: substr(html(first('.property-features__item[data-original-title="Toaletes"]')))(0,1),
      address: html(first('p.property-detail__location')).replace('<i class="fa fa-map-marker"></i>', '').trim(),
      phone: $('.property-detail__contact').find('strong').html()
    };

    console.log(placeInfo);

  });
