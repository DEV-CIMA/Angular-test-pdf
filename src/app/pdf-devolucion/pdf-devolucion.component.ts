import { Component, OnInit } from '@angular/core';

import pdfMake from 'pdfmake/build/pdfmake';
import { vfs } from '../vfs_fonts';

@Component({
  selector: 'app-pdf-devolucion',
  templateUrl: './pdf-devolucion.component.html',
  styleUrls: ['./pdf-devolucion.component.css'],
})
export class PdfDevolucionComponent implements OnInit {
  public recibo = {
    id: '134557',
    codigorecibo: '134557',
    benef: 'CONTRERAS TARRILLO, YURI MASSIEL',
    concepto: 'DEVOLUCIONES',
    descripcion: 'DEV. POLO CIMA NO CORRESPONDE DESCUENTO',
    monto: '35.00',
    generado: '04 DE OCTUBRE DEL 2022',
    impreso: '06/10/2022 10:47:28 AM',
    usuario: 'MELENDRES YPANAQUE, DANA CRISTINA',
    idconcepto: '268',
    area: 'COLEGIO SECUNDARIA',
  };

  public docDefinition: any;

  constructor() {}

  ngOnInit(): void {
    pdfMake.vfs = vfs;
    this.generatePDF();
    this.printPDF();
  }

  generatePDF() {
    const noBorder = [false, false, false, false];
    pdfMake.fonts = {
      Arial: {
        normal: 'arial.woff',
        bold: 'arialBold.woff',
        italics: 'arialItalic.woff',
        bolditalics: 'arialItalicBold.woff',
      },
      ArialMT: {
        normal: 'arialMT.woff',
        bold: 'arialMTBold.woff',
        italics: 'arialMTItalic.woff',
        bolditalics: 'arialMTItalicBold.woff',
      },
    };
    const fecha = new Date();
    this.docDefinition = {
      defaultStyle: {
        font: 'Arial',
        fontSize: 8,
        lineHeight: 1,
      },
      info: { title: 'Document' },
      pageOrientation: 'portrait',
      pageSize: 'A4',
      header: {
        fontSize: 8,
        margin: [21, 10],
        text:
          fecha.toLocaleDateString() +
          ', ' +
          fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      footer: function (currentPage: any, pageCount: any) {
        return {
          text: currentPage.toString() + '/' + pageCount,
          alignment: 'right',
          fontSize: 8,
          margin: [20, 0],
        };
      },
      content: [
        {
          canvas: [
            {
              type: 'rect',
              x: -9,
              y: -17,
              w: 350, //anchura
              h: 220, //altura
              r: 5, //border radius
              lineColor: 'black',
            },
            {
              type: 'rect',
              x: 252,
              y: -8,
              w: 80, //anchura
              h: 25, //altura
              r: 5, //border radius
              lineColor: '#C0C0C0',
              color: '#d9edf7',
            },
          ],
        },
        {
          layout: {
            // hLineColor: 'white',
            // vLineColor: 'white',
            paddingLeft: () => {
              return 0;
            },
            paddingRight: () => {
              return 0;
            },
            paddingTop: () => {
              return 0;
            },
            paddingBottom: () => {
              return 0;
            },
          },
          absolutePosition: { x: 48, y: 36 },
          table: {
            heights: [21, 14, 15, 14, 40, 27, 30],
            widths: [58, 123, 70, 60, 10],
            body: [
              [
                {
                  text: [
                    'RECIBO DE EGRESO ',
                    {
                      text: 'N° ' + this.recibo.codigorecibo,
                      bold: true,
                    },
                  ],
                  colSpan: 3,
                  fontSize: 10.5,
                  border: noBorder,
                },
                '',
                '',
                {
                  text: this.recibo.monto,
                  color: '#337ab7',
                  fontSize: 10.5,
                  font: 'ArialMT',
                  alignment: 'center',
                  border: noBorder,
                },
                { text: '', border: noBorder },
              ],
              [
                {
                  text: 'RECIBÍ DE ',
                  bold: true,
                  colSpan: 5,
                  border: noBorder,
                },
                '',
                '',
                '',
                '',
              ],
              [
                { text: '', border: noBorder },
                { text: 'CIMA', colSpan: 4, font: 'ArialMT', border: noBorder },
                '',
                '',
                '',
              ],
              [
                { text: 'CONCEPTO', bold: true, colSpan: 5, border: noBorder },
                '',
                '',
                '',
                '',
              ],
              [
                { text: '', border: noBorder },
                {
                  text: this.recibo.concepto + ' / ' + this.recibo.descripcion,
                  colSpan: 4,
                  font: 'ArialMT',
                  lineHeight: 1.25,
                  margin: [0, 0, 8, 0],
                  border: noBorder,
                },
                '',
                '',
                '',
              ],
              [
                {
                  text: this.recibo.usuario,
                  bold: true,
                  colSpan: 5,
                  fontSize: 10.5,
                  border: noBorder,
                },
                '',
                '',
                '',
                '',
              ],
              [
                {
                  text: 'FECHA - CHICLAYO, ' + this.recibo.generado,
                  bold: true,
                  colSpan: 5,
                  fontSize: 6.5,
                  border: noBorder,
                },
                '',
                '',
                '',
                '',
              ],
              [
                {
                  text: '',
                  colSpan: 2,
                  border: noBorder,
                },
                '',
                {
                  text: this.recibo.benef,
                  alignment: 'center',
                  bold: true,
                  colSpan: 2,
                  fontSize: 8,
                  lineHeight: 1.25,
                  margin: [1, 3],
                  border: [false, true, false, false],
                },
                '',
                { text: '', border: noBorder },
              ],
              [
                {
                  text: this.recibo.area,
                  colSpan: 2,
                  bold: true,
                  fontSize: 8,
                  border: noBorder,
                },
                '',
                {
                  text: 'IMPRESO: ' + this.recibo.impreso,
                  colSpan: 3,
                  bold: true,
                  fontSize: 6.5,
                  alignment: 'right',
                  margin: [0, 0, 8, 0],
                  border: noBorder,
                },
                '',
                '',
              ],
            ],
          },
        },
      ],
    };
  }
  printPDF() {
    pdfMake.createPdf(this.docDefinition).print();
  }
}
