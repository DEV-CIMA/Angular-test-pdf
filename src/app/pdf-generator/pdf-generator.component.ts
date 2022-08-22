import { Component, OnInit } from '@angular/core';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs; 

@Component({
  selector: 'app-pdf-generator',
  templateUrl: './pdf-generator.component.html',
  styleUrls: ['./pdf-generator.component.css']
})
export class PdfGeneratorComponent implements OnInit {
  
  public anno   = 2022;
  public grado  = '2NDGRADO';
  public nivel  = 'SECUNDARIA';
  public sede   = 'JLO';
  public monto   = '200.00 (doscientos soles) ';
  public localidad = 'Chiclayo';

  public dni    = 72999795;
  public postulante = 'DIAZ VASQUEZ , YEILY YARELY';
  public fNac   = '02/02/2009';
  public edad   = 13;
  public sexo   = 'FEMENINO';
  public tfnSMS = 950413526;
  public otrosTfn  = '950413526,\t988476654';
  public direccion = 'INDOAMERICA 332 PJ. SAN LORENZO';
  public distrito  = 'JOSE LEONARDO ORTIZ > CHICLAYO > JOSE LEONARDO ORTIZ';
  public observaciones = '';
  public religion  = 1;
  public vive   = 'Madre, Padre';
  public procedencia   = 'JORGE BASADRE > Chiclayo | Chiclayo | Lambayeque';

  public relacion     = 'MADRE';
  public parentNombre = 'VASQUEZ FERNANDEZ,LUCILA';
  public parentDni    = 27427628;
  public parentFNac   = '30/01/1975';
  public parentDireccion   = 'INDOAMERICA 332 PJ. SAN LORENZO';
  public parentSms   = 988476654;
  public parentTfn   = '';
  public parentEmail   = '';
  public parentProf   = 'INDEPENDIENTE';
  public parentCentLaboral   = 'COMERCIO DE MAIZ';
  public parentCargo   = '';
  public parentTfnTrabajo  = '';
  public parentIngresoM   = '3000.00';
  
  public resp     = 'VASQUEZ FERNANDEZ, LUCILA';
  public respDni  = 27427628;
  public respTlfn = 988476654;
  public parentIngresoT = '6000.00';

  constructor() {
  }

  ngOnInit(): void {
    this.generatePDF();
  }

  generatePDF() {  
    const fecha = new Date();
    let counterA = 0;
    let counterB = 0;
    let docDefinition: any = {
      pageSize: 'A4',
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
      content: [
        { text      : 'ADMINISÓN ' + this.anno + '\nFICHA RESUMEN',
          fontSize  : 13,
          alignment : 'center',
        },
        { text     : ' ',
          fontSize : 8,
        },
        { text     : 'POSTULANTE ' + '\t\t' + this.grado + '\t\t' + this.nivel + '\t\t' + this.sede,
          fontSize : 15.5,
        },
        {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},
        {
          fontSize: 6.5,
          layout: {
            hLineColor: (i: any, node: any) => {
              const campos = [1, 3, 5, 7, 9, 12, 14, 16, 18, 21, 23, 26, 29, 31, 34, 36];
              counterA++;
              if (campos.includes(counterA)) return 'white';
                else return '#BDBDBD';
            },
            vLineColor: 'white' ,
            paddingLeft   : () => { return 11; },
            paddingRight  : () => { return 11; },
            paddingTop    : () => { return 5; },
            paddingBottom : () => { return 5; }
          },
          table: {
            body: [
              [ {text: 'DATOS:', colSpan: 9, fontSize: 10,}, '', '', '', '', '', '', '', ''],
              [ {text: 'DNI:', bold: true},
                {text: this.dni + '\n'},
                {text: 'POSTULANTE:', bold: true, colSpan: 2}, '',
                {text: this.postulante, colSpan: 3}, '', '',
                {text: 'F.NAC:', bold: true}, 
                {text: this.fNac}
              ],
              [ {text: 'EDAD:', bold: true, colSpan: 1},
                {text: this.edad + ' AÑOS'},
                {text: 'SEXO:', bold: true, colSpan: 1},
                {text: this.sexo,},
                {text: 'TELÉF SMS:', bold: true,},
                {text: this.tfnSMS, colSpan: 2}, '',
                {text: 'OTROS TELÉF:', bold: true},
                {text: this.otrosTfn}
              ],
              [ {text: 'DIRECCIÓN:', bold: true, colSpan: 2}, '',
                {text: this.direccion, colSpan: 3}, '', '',
                {text: 'DISTRITO:', bold: true},
                {text: this.distrito, colSpan: 3}, '', ''
              ],
              [ {text: 'OBSERVACIONES:', bold: true, colSpan: 2}, '',
                {text: this.observaciones, colSpan: 7}, '', '', '', '', '', ''
              ],
              [ {text: 'ALUMNO(A) VIVE CON:', bold: true, colSpan: 2}, '',
                {text: this.vive, alignment : 'center', colSpan: 3}, '', '',
                {text: 'RELIGIÓN:', bold: true,},
                {text: this.religion, alignment : 'center', colSpan: 3}, '', ''
              ],
              [ {text: 'COLEGIO:', colSpan: 9, fontSize: 10}, '', '', '', '', '', '', '', ''],
              [ {text: 'PROCEDENCIA:', bold: true, colSpan: 2}, '',
                {text: [{text:this.procedencia}, {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }], color: 'black'}], colSpan: 7}, '', '', '', '', '', ''
              ],
            ]
          }
        },
        { text     : 'DATOS FAMILIARES',
          fontSize : 15.5,
          margin: [0, 10, 0, 0],
        },
        {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},
        {
          fontSize: 6.5,
          layout: {
            hLineColor: () => {
              const campos = [1, 3, 5, 7, 9, 12, 14, 16, 19, 21, 24, 26, 29, 31, 36, 38, 40, 43, 44, 47, 48];
              counterB++;
              if (campos.includes(counterB)) return 'white';
                else return '#BDBDBD'
            },
            vLineColor: 'white' ,
            paddingLeft   : () => { return 11; },
            paddingRight  : () => { return 11; },
            paddingTop    : () => { return 5; },
            paddingBottom : () => { return 5; }
          },
          table: {
            body: [
              [ {text: this.relacion + ':', colSpan: 9, fontSize: 8.5,}, '', '', '', '', '', '', '', ''],
              [ {text: 'DNI:', bold: true},
                {text: this.parentDni, colSpan: 1},
                {text: 'NOMBRE:', bold: true}, 
                {text: this.parentNombre, colSpan: 4}, '','', '',
                {text: 'F.NAC:', bold: true}, 
                {text: this.parentFNac}
              ],
              [ {text: 'DIRECCIÓN:', bold: true},
                {text: this.parentDireccion, colSpan: 4}, '', '', '',
                {text: 'SMS:', bold: true,},
                {text: this.parentSms, colSpan: 1},
                {text: 'TELÉF:', bold: true, colSpan: 1},
                {text: this.parentTfn}
              ],
              [ {text: 'EMAIL:', bold: true,},
                {text: this.parentEmail, colSpan: 4}, '', '', '',
                {text: 'PROF:', bold: true},
                {text: this.parentProf, colSpan: 3}, '', ''
              ],
              [ {text: 'CENT. LABORAL:', bold: true},
                {text: this.parentCentLaboral, colSpan: 4}, '', '', '',
                {text: 'CARGO:', bold: true, colSpan: 1},
                {text: this.parentCargo, colSpan: 3}, '', ''
              ],
              [ {text: 'TELF TRABAJO:', bold: true, colSpan: 1},
                {text: this.parentTfnTrabajo, colSpan: 4}, '', '', '',
                {text: 'INGRESO MENSUAL:', bold: true, colSpan: 2}, '',
                {text: this.parentIngresoM, colSpan: 2}, ''
              ],
              [ {text:' ', colSpan: 9, fontSize: 1}, '', '', '', '', '', '', '', ''],
              [ {text: 'RESP. DE PAGOS:', bold: true, colSpan: 1},
                {text: this.resp, colSpan: 4}, '', '', '',
                {text: 'DNI:', bold: true, colSpan: 1},
                {text: this.respDni,},
                {text: 'TÉLEF:', bold: true, colSpan: 1},
                {text: this.respTlfn}
              ],
              [ {text: '', colSpan: 5}, '', '', '', '',
                {text: 'INGRESO TOTAL:', bold: true, colSpan: 2}, '',
                {text: this.parentIngresoT, colSpan: 2}, ''
              ],
              [ { text: '*\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t*' +
                  '*\t\t\t\t\t\t\t\t\t\t\t\t\t\t*',
                  color: 'white', colSpan: 5, fontSize: 4}, '', '', '', '',
                { text: '*\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t*' +
                  '*\t\t\t\t\t\t\t\t\t\t\t\t\t*',
                  color: 'white', colSpan: 4, fontSize: 4}, '', '', ''
              ],
            ]
          }
        },
        { text      : 'DECLARACIÓN JURADA',
          fontSize  : 13,
          alignment : 'center',
        },
        { text      : ' ',
          fontSize  : 14,
        },
        { text       : [
                        'YO, ' + this.parentNombre + ', DNI N°' + this.parentDni + 
                        ', por medio del presente documento declaro bajo juramento que lo datos suministrados en esta ficha son verdaderos. Igualmente declaro que he sido suficientemente informado(a) sobre los costos y características del servicio educativo brindado por la I.E. CIMA., con los cuales estoy conforme, también he leído el contrato de prestación de servicios educativos '
                        + this.anno +
                        ' y la declaración del padre o apoderado - año escolar ' + this.anno +
                        ' con cuyo contenido estoy de acuerdo y lo suscribiré al momento de la matrícula. Estoy de acuerdo con el proceso de admisión para incorporar a mi menor hijo(a), así mismo que todos los pagos efectuados ',
                        {text: 'SE CONSIDERARÁN COMO RESERVA DE VACANTE', bold: true},
                        ' hasta culminar el proceso; si es afirmativo los resultados, dichos pagos formarán parte de la matrícula y/o cuota de ingreso, una vez cumplido con presentar los documentos necesarios para formalizar la matrícula, como son: 1) Certificados de Estudios del año inmediatamente anterior que acredite haber culminado satisfactoriamente. 2) DNI del (la) estudiante. 3) Partida de Nacimiento del (la) estudiante. 4) Ficha única de matrícula generada por el SIAGIE, 5) Resolución de traslado (cuando corresponda). Si es negativo el resultado, los pagos a cuenta recibidos serán devueltos; en caso el (la) estudiante haya sido admitido y los padres desistan de culminar el proceso; de los pagos recibidos, se descontará la cantidad de S/',
                        this.monto,
                        'por concepto de gastos administrativos. En caso falte presentar alguno de los documentos antes mencionados, no podré matricular a mi menor; exonerando de toda responsabilidad a la I.E. CIMA. De comprobarse que he entregado documentos o información falsa, se dejará sin efecto todos los actos que se hayas generado, tomando en cuenta los documentos o información incorrecta.'
                       ],
          fontSize   : 8,
          lineHeight : 1.25,
          alignment  : 'justify',
        },
        { text       : this.localidad + ', ' + fecha.toLocaleDateString('es-PE', { day: '2-digit' }) +
                       ' de ' + fecha.toLocaleDateString('es-PE', { month: 'long' }) +
                       ' del '+ fecha.toLocaleDateString('es-PE', { year: 'numeric' }),
          fontSize   : 6.5,
          alignment  : 'right',
        },
        { alignment  : 'center',
          columns: [
          {text: 'FIRMA', bold: true, fontSize: 11},
          {text: 'Huella digital', fontSize: 6.5}
        ]}
      ]
    };  

    pdfMake.createPdf(docDefinition).open();  
  }
  

}
