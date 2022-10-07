import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import { vfs } from '../vfs_fonts';

@Component({
  selector: 'app-pdf-ingreso',
  templateUrl: './pdf-ingreso.component.html',
  styleUrls: ['./pdf-ingreso.component.css'],
})
export class PdfIngresoComponent implements OnInit {
  public recibo = {
    id: '134543',
    codigorecibo: '134543',
    benef: 'OBALLE BRAVO, MARIA ROSALIN',
    concepto: 'CAJA DIA ANTERIOR',
    descripcion: 'CAJA DIA ANTERIOR',
    monto: '1043.72',
    generado: '04 DE OCTUBRE DEL 2022',
    impreso: '07/10/2022 09:05:02 AM',
    usuario: 'OBALLE BRAVO, MARIA ROSALIN',
    idconcepto: '220',
    area: '',
  };

  public docDefinition: any;
  constructor() {}

  ngOnInit(): void {
    pdfMake.vfs = vfs;
    this.generatePDF();
    this.printPDF();
  }

  getRecibo(x: number, y: number): any {
    const noBorder = [false, false, false, false];
    return {
      layout: {
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
      absolutePosition: { x: x, y: y },
      table: {
        heights: [23, 14, 15, 14, 23, 27, 30],
        widths: [40, 57, 70, 60, 10],
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
            {
              text: this.recibo.usuario,
              colSpan: 4,
              font: 'ArialMT',
              border: noBorder,
            },
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
              text: this.recibo.descripcion,
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
              colSpan: 2,
              bold: true,
              fontSize: 6.5,
              alignment: 'right',
              margin: [0, 0, 8, 0],
              border: noBorder,
            },
            '',
            { text: '', border: noBorder },
          ],
        ],
      },
    };
  }

  generatePDF() {
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
              w: 258, //anchura
              h: 185, //altura
              r: 5, //border radius
              lineColor: 'black',
            },
            {
              type: 'rect',
              x: 180,
              y: -8,
              w: 59, //anchura
              h: 25, //altura
              r: 5, //border radius
              lineColor: '#C0C0C0',
              color: '#d9edf7',
            },
            {
              type: 'rect',
              x: 267,
              y: -17,
              w: 258, //anchura
              h: 185, //altura
              r: 5, //border radius
              lineColor: 'black',
            },
            {
              type: 'rect',
              x: 458,
              y: -8,
              w: 59, //anchura
              h: 25, //altura
              r: 5, //border radius
              lineColor: '#C0C0C0',
              color: '#d9edf7',
            },
          ],
        },
        this.getRecibo(48, 36),
        this.getRecibo(326, 36),
      ],
    };
  }
  printPDF() {
    pdfMake.createPdf(this.docDefinition).print();
  }
}
