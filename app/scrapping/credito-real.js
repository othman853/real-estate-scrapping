const domStuff =
  $ => ({
    first: select => $(select).first(),
    html: piece => piece.html() || '',
    substr: text => (begin=0, end) => text.trim().substring(begin, end)
  });

module.exports =
  $ => {
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

    return placeInfo;
  };
