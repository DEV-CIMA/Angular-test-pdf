import { Component, OnInit } from '@angular/core';

import pdfMake from 'pdfmake/build/pdfmake';
import { vfs } from '../vfs_fonts';

@Component({
  selector: 'app-pdf-declaracion-jurada',
  templateUrl: './pdf-declaracion-jurada.component.html',
  styleUrls: ['./pdf-declaracion-jurada.component.css'],
})
export class PdfDeclaracionJuradaComponent implements OnInit {
  public docDefinition: any;
  constructor() {}

  ngOnInit(): void {
    pdfMake.vfs = vfs;
    this.generatePDF();
    this.printPDF();
  }

  generatePDF() {
    pdfMake.fonts = {
      Arial: {
        normal: 'arial.woff',
        bold: 'arialBold.woff',
      },
      ArialMT: {
        normal: 'arialMT.woff',
        bold: 'arialMTBold.woff',
      },
    };
    this.docDefinition = {
      defaultStyle: {
        alignment: 'justify',
        font: 'Arial',
        fontSize: 12,
        lineHeight: 1.5,
      },
      info: { title: 'AdmisionFichaResumen' },
      pageOrientation: 'portrait',
      pageSize: 'A4',
      content: [
        {
          text: '\n',
          fontSize: 14,
        },
        {
          text: 'DECLARACION JURADA DE INGRESOS',
          alignment: 'center',
          bold: true,
          fontSize: 14,
          margin: [0, 70.8661, 0, 0],
        },
        {
          text: '\n\n',
        },
        {
          text: [
            'Yo, ______________________________, identificada(o) con DNI N° ________________,' +
              ' con domicilio actual ubicado en __________________________________' +
              'del Distrito ________________, Provincia _________________, Departamento' +
              ' __________________ .',
          ],
          margin: [56.6929, 0, 56.6929, 0],
        },
        {
          text: '\n',
        },
        {
          text: [
            'Apoderado(a) de mi menor hijo (a)' +
              ' _______________________________________, con DNI, N° ' +
              '_____________, del grado: ________, del nivel inicial___' +
              ' Primaria ___, Secundaria ___, de la ',
            { text: 'I.E CIMA', bold: true },
          ],
          margin: [56.6929, 0, 56.6929, 0],
        },

        {
          text: 'DECLARO BAJO JURAMENTO',
          alignment: 'center',
          bold: true,
          fontSize: 12,
          margin: [0, 70.8661, 0, 0],
        },
        {
          text: '\n\n',
        },
        {
          text: [
            'Que actualmente soy trabajador(a) independiente, desempeñandome como ' +
              '________________ percibiendo un monto mensual aproximado de S/________________' +
              ', lo que me permitirá cancelar puntulamente las pesiones educativas de mi menor hijo(a), así como atender otros requerimientos' +
              ' que necesite para que pueda estudiar sin niguna dificultad en el colegio.',
          ],
          margin: [56.6929, 0, 56.6929, 0],
          fontSize: 12,
        },
        {
          text: '\n',
        },
        {
          text: ['Chiclayo, ______________ 202__'],
          alignment: 'right',
          fontSize: 10,
          style: 'text',
          margin: [56.6929, 0, 56.6929, 0],
        },
        {
          text: '\n',
          fontSize: 14,
        },
        {
          text: '____________________',
          alignment: 'center',
          fontSize: 14,
          margin: [0, 70.8661, 0, 0],
        },
      ],
    };
  }
  printPDF() {
    pdfMake.createPdf(this.docDefinition).print();
  }
}
