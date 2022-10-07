import { Component, OnInit } from '@angular/core';

import pdfMake from 'pdfmake/build/pdfmake';
import { vfs } from '../vfs_fonts';
const fecha = new Date();
var counter = 0;
@Component({
  selector: 'app-pdf-generator-economico',
  templateUrl: './pdf-generator-economico.component.html',
  styleUrls: ['./pdf-generator-economico.component.css'],
})
export class PdfGeneratorEconomicoComponent implements OnInit {
  public recibo = {
    nrecibo: 2821795,
    fechaEmision: '25/01/2022',
    fechaVencim: '25/01/2022',
    concepto: 'RESERVA DE VACANTE',
    alumno: 'VALLEJOS HERRERA, JHINMER OCTAVIO',
    grado: '4TH',
    nivel: 'SECONDARY',
    web: 'https://colegiocima.edu.pe/',
    subTotal: '310.00',
    entidad: 'BANCO CONTINENTAL, BBVA',
    total: 310,
    sede: 'Av. Alfonso Ugarte 640',
    tlf: '074 235050',
    localidad: 'Chiclayo',
    fechaimpreso: ' 2022-08-22 - 12:34:23 PM',
  };

  public docDefinition: any;

  public getContent(): any {
    return {
      layout: {
        hLineColor: (i: any, node: any) => {
          counter++;
          if ([17, 18, 19].includes(counter)) return 'black';
          else {
            if (counter == 28) counter = 0;
            return 'white';
          }
        },
        vLineColor: 'white',
        paddingLeft: () => {
          return 8;
        },
        paddingRight: () => {
          return 8;
        },
        paddingTop: () => {
          return 0.1;
        },
        paddingBottom: () => {
          return 0.1;
        },
      },
      table: {
        body: [
          [{ text: 'IEP CIMA', colSpan: 6 }, '', '', '', '', ''],
          [
            { text: 'RECIBO DE PAGO', colSpan: 4 },
            '',
            '',
            '',
            {
              text: 'N° ' + this.recibo.nrecibo,
              bold: true,
              colSpan: 2,
            },
            '',
          ],
          [
            {
              text: 'FECHA DE EMISIÓN',
              colSpan: 4,
              margin: [0, 5, 0, 21],
            },
            '',
            '',
            '',
            {
              text: this.recibo.fechaEmision,
              bold: true,
              colSpan: 2,
              margin: [0, 5, 0, 21],
            },
            '',
          ],
          [
            {
              text: ['ALUMNO:\t', { text: this.recibo, bold: true }],
              colSpan: 6,
            },
            '',
            '',
            '',
            '',
            '',
          ],
          [
            {
              text: [
                'GRADO: \t',
                { text: this.recibo.grado + '- ?', bold: true },
              ],
              colSpan: 6,
            },
            '',
            '',
            '',
            '',
            '',
          ],
          [
            {
              text: ['NIVEL: \t', { text: this.recibo.nivel, bold: true }],
              colSpan: 6,
            },
            '',
            '',
            '',
            '',
            '',
          ],
          [
            {
              text: 'Concepto',
              bold: true,
              alignment: 'center',
              colSpan: 2,
            },
            '',
            {
              text: 'Fecha Venc.',
              bold: true,
              alignment: 'center',
              colSpan: 2,
            },
            '',
            {
              text: 'Sub Total',
              bold: true,
              alignment: 'center',
              colSpan: 2,
            },
            '',
          ],
          [
            {
              text: this.recibo.concepto,
              alignment: 'center',
              colSpan: 2,
            },
            '',
            {
              text: this.recibo.fechaVencim,
              alignment: 'center',
              colSpan: 2,
            },
            '',
            {
              text: this.recibo.subTotal,
              alignment: 'center',
              colSpan: 2,
            },
            '',
          ],
          [
            '',
            '',
            '',
            {
              text: 'S/.',
              bold: true,
              alignment: 'right',
              margin: [0, 18, 0, 18],
            },
            {
              text: this.recibo.total,
              colSpan: 2,
              bold: true,
              margin: [0, 18, 0, 18],
              alignment: 'center',
            },
            '',
          ],
          [
            {
              text: [
                'SON: ' + this.recibo.total + ' NUEVOS SOLES\n',
                'Atendido por ' +
                  this.recibo.entidad +
                  ' el ' +
                  this.recibo.fechaEmision,
                '\n' +
                  this.recibo.sede +
                  '. Tlf. ' +
                  this.recibo.tlf +
                  '. ' +
                  this.recibo.localidad,
                '\nWeb ' + this.recibo.web,
                '\nImpreso el ' +
                  fecha.toLocaleDateString('es-PE', {
                    year: 'numeric',
                  }) +
                  '-' +
                  fecha.toLocaleDateString('es-PE', {
                    month: '2-digit',
                  }) +
                  '-' +
                  fecha.toLocaleDateString('es-PE', {
                    day: '2-digit',
                  }) +
                  ' - ' +
                  fecha
                    .toLocaleString('es-PE', {
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: true,
                    })
                    .toUpperCase() +
                  '.',
              ],
              colSpan: 6,
            },
            '',
            '',
            '',
            '',
            '',
          ],
        ],
      },
    };
  }

  constructor() {}

  ngOnInit(): void {
    pdfMake.vfs = vfs;
    this.generatePDF();
    this.printPDF();
  }

  generatePDF() {
    pdfMake.fonts = {
      Courier: {
        normal: 'courier.woff',
        bold: 'courierBold.woff',
      },
      ArialMT: {
        normal: 'arialMT.woff',
      },
    };
    const fecha = new Date();
    var counter = 0;
    this.docDefinition = {
      defaultStyle: {
        font: 'ArialMT',
        fontSize: 7.5,
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
          font: 'Courier',
          columns: [this.getContent(), this.getContent()],
        },
      ],
    };
  }
  printPDF() {
    pdfMake.createPdf(this.docDefinition).print();
  }
}
