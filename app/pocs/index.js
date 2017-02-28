const poc =
  (name, root, endpoints) => ({
    name,
    root,
    endpoints
  });


module.exports = [
  poc(
    'auxiliadora-predial',
    'https://www.auxiliadorapredial.com.br',
    [
      '/imovel-aluguel-apartamento-rio-branco-porto-alegre-rs-81109030',
      '/imovel-aluguel-apartamento-alto-petropolis-porto-alegre-rs-81110561'
    ]
  ),
  poc(
    'credito-real',
    'https://www.creditoreal.com.br/alugueis',
    [
      '/1399/apartamento-com-2-dormitorios-no-bairro-petropolis-em-porto-alegre',
      '/66061/apartamento-com-1-dormitorio-no-bairro-floresta-em-porto-alegre',
      '/62124/apartamento-com-2-dormitorios-no-bairro-floresta-em-porto-alegre'
    ]
  )
];
