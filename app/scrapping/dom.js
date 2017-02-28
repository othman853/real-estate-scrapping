module.exports = $ => {

  const first =
    q => $(q).first();

  const attr =
    piece => attrName => piece.attr(attrName) || '';

  const toAttr =
    attrName => piece => piece.attr(attrName);

  const html =
    piece => piece.html() || '';

  const byProp =
    (q, propName, propValue) => $(`${q}[${propName}=${propValue}]`);

  const all =
    q => $(q).toArray();

  const allMapped =
    q => all(q).map($);

  const find =
    q => piece => piece.find(q);

  const existing =
    whatever => whatever;

  const nth =
    nth => piece => piece.eq(nth);

  return { first, attr, html, byProp, all, allMapped, find, existing, toAttr, nth };

};
