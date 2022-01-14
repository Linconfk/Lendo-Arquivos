const fs = require('fs');
const doc = require('pdfkit');
const PDFDocument = require('pdfkit');
const logo = 'resources/logo.png'
const logoFooter = 'resources/logofoooter.jpg'

class GerarPdf {
    
    // traz os dados de teste.csv 
    async gerar(dados) {
        await this.createInvoice(dados, 'resources/teste.pdf')
        console.log(dados)
        return 'ok'
    }
    
    // Cria o pdf
    createInvoice(dados, path) {
        let doc = new PDFDocument({margin: 50});
        
        this.generateHeader(doc);
        
        doc.moveTo(100, 260)
        .lineTo(100, 520)
        .stroke()
        
        doc.moveTo(230, 260)
        .lineTo(230, 520)
        .stroke()
        
        this.generateInvoiceTable(doc, dados);
        this.generateRevenue(doc, dados)
        this.generateIr(doc, dados)
        
        this.logoFooter(doc)

        doc.end();
        doc.pipe(fs.createWriteStream(path));
    }
    generateHeader(doc,) {
        doc.image(logo, 50, 15, { width: 240 })
            .fontSize(20)
            .fontSize(10)
            .moveDown();
    
        this.textp(doc, 'DIRF – Declaração de Imposto de Renda Retido na Fonte', 100);
        this.textp(doc, 'Fonte Pagadora: BRASIL CASH SOLUCOES EM PAGAMENTOS LTDA – CNPJ: 30.507.541/0001-71', 140);
        this.textp(doc, 'Descrição do Rendimento: 8045 – Outros Rendimentos', 160);
        this.textp(doc, 'Razão Social do Estabelecimento: CREUSA SOUSA FERREIRA', 200);
        this.textp(doc, 'CNPJ: 21.498.063/0001-90', 220);
        this.textp(doc, 'Ano de Referência: 2019', 240);
    
    }
    logoFooter(doc,) {
        doc.image(logoFooter, 300, 650, { width: 240 })
            .fontSize(20)
            .fontSize(10)
            .moveDown();
    }
    
    // gera as tabelas do nosso pdf
    generateInvoiceTable(doc, dados) {
        this.row(doc, 260);
        this.row(doc, 280);
        this.row(doc, 300);
        this.row(doc, 320);
        this.row(doc, 340);
        this.row(doc, 360);
        this.row(doc, 380);
        this.row(doc, 400);
        this.row(doc, 420);
        this.row(doc, 440);
        this.row(doc, 460);
        this.row(doc, 480);
        this.row(doc, 500);


        this.textInRowFirst(doc, '', 270);
        this.textInRowFirst(doc, 'jan/19', 290);
        this.textInRowFirst(doc, 'fev/19', 310);
        this.textInRowFirst(doc, 'mar/19', 330);
        this.textInRowFirst(doc, 'abr/19', 350);
        this.textInRowFirst(doc, 'mai/19', 370);
        this.textInRowFirst(doc, 'jun/19', 390);
        this.textInRowFirst(doc, 'jul/19', 410);
        this.textInRowFirst(doc, 'ago/19', 430);
        this.textInRowFirst(doc, 'set/19', 450);
        this.textInRowFirst(doc, 'out/19', 470);
        this.textInRowFirst(doc, 'dez/19', 490);
        this.textInRowFirst(doc, 'Total', 510);
    }
    
    generateRevenue(doc, dados){
        
        this.revenue(doc, 'Receita', 270);
        this.revenue(doc, '0,02', 290);
        this.revenue(doc, '153,27', 310);
        this.revenue(doc, '260,79', 330);
        this.revenue(doc, '260,79', 350);
        this.revenue(doc, '255,43', 370);
        this.revenue(doc, '241,11', 390);
        this.revenue(doc, '194,32', 410);
        this.revenue(doc, '340,37', 430);
        this.revenue(doc, '190,97', 450);
        this.revenue(doc, '300,39', 470);
        this.revenue(doc, '148,67', 490,);
        this.revenue(doc, '2.502,44 ', 510);
        
        
    }
 
                                
   
    generateIr(doc, dados){
        
        this.ir(doc, 'IR', 270);
        this.ir(doc, '0,00', 290);
        this.ir(doc, '2,30', 310);
        this.ir(doc, '3,38', 330);
        this.ir(doc, '2,87', 350);
        this.ir(doc, '3,91', 370);
        this.ir(doc, '3,83', 390);
        this.ir(doc, '3,62', 410);
        this.ir(doc, '2,91', 430);
        this.ir(doc, '5,11', 450);
        this.ir(doc, '2,86', 470);
        this.ir(doc, '4,51', 490,);
        this.ir(doc, '37,54', 510);
        
        
    }
 
    // gera o Header do nosso pdf
    


    row(doc, heigth) {
        doc.lineJoin('miter')
            .rect(30, heigth, 340, 20)
            .stroke()
        return doc
    }

    textp(doc, text, heigth) {
        doc.y = heigth;
        doc.x = 30;
        doc.fillColor('black')
        doc.text(text, {
            paragraphGap: 5,
            indent: 5,
            align: 'justify',
            columns: 1,
        });
        return doc
    }

    revenue(doc, text, heigth) {
        doc.y = heigth;
        doc.x = 180;
        doc.fillColor('black')
        doc.text(text, {
            paragraphGap: 5,
            indent: 5,
            align: 'justify',
            columns: 1,
        });
        return doc
    }

    ir(doc, text, heigth) {
        doc.y = heigth;
        doc.x = 310;
        doc.fillColor('black')
        doc.text(text, {
            paragraphGap: 5,
            indent: 5,
            align: 'justify',
            columns: 1,
        });
        return doc
    }

    textInRowFirst(doc, text, heigth) {
        doc.y = heigth;
        doc.x = 30;
        doc.fillColor('black')
        doc.text(text, {
            paragraphGap: 5,
            indent: 5,
            align: 'justify',
            columns: 1,
        });
        return doc
    }






}

module.exports = new GerarPdf()