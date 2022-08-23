import { Component, OnInit } from '@angular/core';

import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
import { vfs } from './vfs_fonts';

@Component({
  selector: 'app-pdf-generator-economico',
  templateUrl: './pdf-generator-economico.component.html',
  styleUrls: ['./pdf-generator-economico.component.css']
})
export class PdfGeneratorEconomicoComponent implements OnInit {

  public nrecibo = 2821795;
  public fechaEmision = '25/01/2022';
  public fechaVencim = '25/01/2022';
  public alumno = 'VALLEJOS HERRERA, JHINMER OCTAVIO';
  public grado = '4TH';
  public nivel = 'SECONDARY';
  public web = 'https://colegiocima.edu.pe/';
  public concepto = 'RESERVA DE VACANTE';
  public subTotal = '310.00';
  public entidad = 'BANCO CONTINENTAL, BBVA';
  public total = 310;
  public sede = 'Av. Alfonso Ugarte 640';
  public tlf = '074 235050';
  public localidad = 'Chiclayo';
  public fechaimpreso = ' 2022-08-22 - 12:34:23 PM';

  constructor() { }

  ngOnInit(): void {
    pdfMake.vfs = vfs; 
    console.log(pdfMake.vfs)
    this.generatePDF();
  }

  generatePDF() {
    pdfMake.fonts = {
      Courier: {
        normal: 'courier.woff',
        bold: 'courierBold.woff',
        italics: 'courierItalic.woff',
        bolditalics: 'courierItalicBold.woff'
      },
    };
    const fecha  = new Date();
    let counter = 0;
    const docDefinition: any = {
      info: { title: 'Document' },
      pageSize: 'A4',
      defaultStyle: {
        font: 'Courier'
      },
      pageOrientation: 'portrait',
      header: {
        margin: [21, 10],
        fontSize: 8,
        text: fecha.toLocaleDateString() + ', ' + fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
      footer: function(currentPage: any, pageCount:any) { 
        return {
          text: currentPage.toString() + '/' + pageCount,
          alignment : 'right',
          fontSize : 8,
          margin: [20, 0]
        }; 
      },
      content: [{
        fontSize: 7.5,
        lineHeight : 1,
        columns: [ 
          { 
            layout: {
              hLineColor: (i: any, node: any) => {
                counter++;
                if ([17, 18, 19].includes(counter)) return 'black';
                  else {
                    if(counter == 28) counter = 0;
                    return 'white'
                  };
              },
              vLineColor: 'white' ,
              paddingLeft   : () => { return 8; },
              paddingRight  : () => { return 8; },
              paddingTop    : () => { return 0.10; },
              paddingBottom : () => { return 0.10; }
            },
            table: {
              body: [
                [{text: 'IEP CIMA', colSpan: 6}, '', '', '', '', ''],
                [{text:'RECIBO DE PAGO', colSpan: 4}, '', '', '', {text: 'N° ' + this.nrecibo, bold: true, colSpan: 2}, ''],
                [{text:'FECHA DE EMISIÓN', colSpan: 4, margin: [0,5,0,21]}, '', '', '', {text: this.fechaEmision, bold: true, colSpan: 2, margin: [0,5,0,21]}, ''],
                [{text:['ALUMNO:\t', {text: this.alumno, bold: true}], colSpan: 6}, '', '', '', '', ''],
                [{text:['GRADO: \t', {text:this.grado + '- ?', bold: true}], colSpan: 6}, '', '', '', '', ''],
                [{text:['NIVEL: \t', {text:this.nivel, bold: true}], colSpan: 6}, '', '', '', '', ''],
                [{text:'Concepto', bold: true, alignment: 'center', colSpan: 2}, '', {text:'Fecha Venc.', bold: true, alignment: 'center', colSpan: 2}, '', {text:'Sub Total', bold: true, alignment: 'center', colSpan: 2}, ''],
                [{text: this.concepto, alignment: 'center', colSpan: 2}, '', {text: this.fechaVencim, alignment: 'center', colSpan: 2}, '', {text: this.subTotal, alignment: 'center', colSpan: 2}, ''],
                ['', '', '', {text: 'S/.', bold: true, alignment: 'right', margin: [0,18,0,18]}, {text: this.total, colSpan: 2, bold: true, margin: [0,18,0,18], alignment: 'center'}, ''],
                [{text: [
                  'SON: ' + this.total + ' NUEVOS SOLES\n',
                  'Atendido por ' + this.entidad + ' el ' + this.fechaEmision,
                  '\n' + this.sede + '. Tlf. ' + this.tlf + '. ' + this.localidad,
                  '\nWeb ' + this.web,
                  '\nImpreso el ' + fecha.toLocaleDateString('es-PE', { year: 'numeric' })
                  + '-' + fecha.toLocaleDateString('es-PE', { month: '2-digit' })
                  + '-' + fecha.toLocaleDateString('es-PE', { day: '2-digit' })
                  + ' - ' + fecha.toLocaleString('es-PE', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).toUpperCase() + '.'
                ], colSpan: 6}, '', '', '', '', ''],
              ]
            }
          },
          { 
            layout: {
              hLineColor: (i: any, node: any) => {
                counter++;
                if ([17, 18, 19].includes(counter)) return 'black';
                  else {
                    if(counter == 28) counter = 0;
                    return 'white'
                  };
              },
              vLineColor: 'white' ,
              paddingLeft   : () => { return 8; },
              paddingRight  : () => { return 8; },
              paddingTop    : () => { return 0.10; },
              paddingBottom : () => { return 0.10; }
            },
            table: {
              body: [
                [{text: 'IEP CIMA', colSpan: 6}, '', '', '', '', ''],
                [{text:'RECIBO DE PAGO', colSpan: 4}, '', '', '', {text: 'N° ' + this.nrecibo, bold: true, colSpan: 2}, ''],
                [{text:'FECHA DE EMISIÓN', colSpan: 4, margin: [0,5,0,21]}, '', '', '', {text: this.fechaEmision, bold: true, colSpan: 2, margin: [0,5,0,21]}, ''],
                [{text:['ALUMNO:\t\t', {text: this.alumno, bold: true}], colSpan: 6}, '', '', '', '', ''],
                [{text:['GRADO: \t\t', {text:this.grado + '- ?', bold: true}], colSpan: 6}, '', '', '', '', ''],
                [{text:['NIVEL: \t\t', {text:this.nivel, bold: true}], colSpan: 6}, '', '', '', '', ''],
                [{text:'Concepto', bold: true, alignment: 'center', colSpan: 2}, '', {text:'Fecha Venc.', bold: true, alignment: 'center', colSpan: 2}, '', {text:'Sub Total', bold: true, alignment: 'center', colSpan: 2}, ''],
                [{text: this.concepto, alignment: 'center', colSpan: 2}, '', {text: this.fechaVencim, alignment: 'center', colSpan: 2}, '', {text: this.subTotal, alignment: 'center', colSpan: 2}, ''],
                ['', '', '', {text: 'S/.', bold: true, alignment: 'right', margin: [0,18,0,18]}, {text: this.total, colSpan: 2, bold: true, margin: [0,18,0,18], alignment: 'center'}, ''],
                [{text: [
                  'SON: ' + this.total + ' NUEVOS SOLES\n',
                  'Atendido por ' + this.entidad + ' el ' + this.fechaEmision,
                  '\n' + this.sede + '. Tlf. ' + this.tlf + '. ' + this.localidad,
                  '\nWeb ' + this.web,
                  '\nImpreso el ' + fecha.toLocaleDateString('es-PE', { year: 'numeric' })
                  + '-' + fecha.toLocaleDateString('es-PE', { month: '2-digit' })
                  + '-' + fecha.toLocaleDateString('es-PE', { day: '2-digit' })
                  + ' - ' + fecha.toLocaleString('es-PE', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).toUpperCase() + '.'
                ], colSpan: 6}, '', '', '', '', ''],
              ]
            }
          }
        ]
      }]
    }
    pdfMake.createPdf(docDefinition).open(); 
  };
}
