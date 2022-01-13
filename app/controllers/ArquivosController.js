const Arquivos = require('./../models/Arquivos')

const AarquivosController = {

    async readFile(request, response){
        return Arquivos.ReadFile(request, response);
    }
}

module.exports = AarquivosController