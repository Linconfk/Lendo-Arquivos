const fs = require('fs');
const stream = require('stream');
const readLine = require('readline');
const GerarPdf = require('./GerarPdf')

class Arquivos {

    async ReadFile(request, response){

        const arquivo_entrada = "resources/teste.csv"

        if(!fs.existsSync(arquivo_entrada)){

            return response.status(404).json({
                mensagem: 'O Arquivo nâo existe',
                data: arquivo_entrada
            })
        }

        const instream = fs.createReadStream(arquivo_entrada, {encoding: 'utf8'});
        var outstream = new stream();

        const rl = readLine.createInterface(instream, outstream);
        let objeto = [];



        for await (const line of rl){
            const data = line.split(';');

                 objeto.push({
                Nome: data[0],
                Empresa: data[1],
                Cidade: data[2],
                Endereço: data[3],
                Estado: data[4],
                Complemento: data[5],
                Bairro: data[6],
                Cep: data[7],
                Pais: data[8],
            })
        }
    
        const gerar = await GerarPdf.gerar(objeto)


        return response.status(200).json({
            mensagem: "ok",
            data: gerar
        })
    }
}

module.exports = new Arquivos();