const express = require('express');
const route = express.Router();

const ArquivosController = require('./../app/controllers/ArquivosController');


route.get('/', (request, response) => {

  response.status(200).json({
    message: 'Olá mundo.'
  })

})

route.get('/arquivos/leitura', ArquivosController.readFile)

module.exports = route;
