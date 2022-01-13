const fs = require('fs');
const PDFDocument = require('pdfkit');
const logo = 'resources/logo.png'

class GerarPdf {

    // traz os dados de teste.csv 
    async gerar(dados) {
        await this.createInvoice(dados, 'resources/teste.pdf')
        console.log(dados)
        return 'ok'
    }
    
    // Cria o pdf
    createInvoice(dados, path) {
        let doc = new PDFDocument({ margin: 50 });
    
        this.generateHeader(doc);
        this.generateInvoiceTable(doc, dados);
    
        doc.end();
        doc.pipe(fs.createWriteStream(path));
    }

    // gera o Header do nosso pdf
    generateHeader(doc) {
        doc.image(logo, 50, 15, { width: 160 })
            .fontSize(20)
            .fontSize(10)
            .moveDown();
    }

    // gera as tabelas do nosso pdf
    generateInvoiceTable(doc, dados) {
        let i,
            dadosTableTop = 40;
            for (i = 0; i < dados.length; i++) {
            if(i === 20) break
            const item = dados[i];
            const position = dadosTableTop + (i + 1) * 30;
            this.generateTableRow(
                doc,
                position,
                item.Nome,
                item.Empresa,
                item.Cep,
                item.Cidade,
            );
        }
    }
    // gera a estilização do dados do nosso pdf
    generateTableRow(doc, y, c1, c2, c3, c4) {
        doc.fontSize(9)
            .text(c1, 50, y)
            .text(c2, 200, y)
            .text(c3, 340, y, { width: 90, align: 'right' })
            .text(c4, 470, y, { width: 90, align: 'right' })
    }
}
module.exports = new GerarPdf()