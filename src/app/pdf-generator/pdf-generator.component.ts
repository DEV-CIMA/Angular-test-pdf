import { Component, OnInit } from '@angular/core';

import pdfMake from 'pdfmake/build/pdfmake';
import { vfs } from '../vfs_fonts';

@Component({
  selector: 'app-pdf-generator',
  templateUrl: './pdf-generator.component.html',
  styleUrls: ['./pdf-generator.component.css']
})
export class PdfGeneratorComponent implements OnInit {
  
  public anno      =  2022;
  public localidad = 'Chiclayo';
  public dni    = 72999795;
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

  public monto     = '200.00 (doscientos soles) ';

  public postulante = {
    direccion    : 'INDOAMERICA 332 PJ. SAN LORENZO',
    distrito     : 'JOSE LEONARDO ORTIZ > CHICLAYO > JOSE LEONARDO ORTIZ',
    dni          :  72999795,
    edad         :  13,
    fNac         : '02/02/2009',
    grado        : '2NDGRADO',
    nivel        : 'SECUNDARIA',
    nombre       : 'DIAZ VASQUEZ , YEILY YARELY',
    observaciones: '',
    otrosTfn     : '950413526,\t988476654',
    procedencia  : 'JORGE BASADRE > Chiclayo | Chiclayo | Lambayeque',
    religion     :  1,
    sede         : 'JLO',
    sexo         : 'FEMENINO',
    tfnSMS       : 950413526,
    viveCon      : 'MADRE - PADRE'
  }; 
  public pariente = {
    relacion   : 'MADRE',
    nombre     : 'VASQUEZ FERNANDEZ,LUCILA',
    dni        : 27427628,
    fNac       : '30/01/1975',
    direccion  : 'INDOAMERICA 332 PJ. SAN LORENZO',
    sms        : 988476654,
    tfn        : '',
    email      : '',
    prof       : 'INDEPENDIENTE',
    centLaboral: 'COMERCIO DE MAIZ',
    cargo      : '',
    tfnTrabajo : '',
    ingresoM   : '3000.00',
  };
  
  public responsable = {
    nombre  : 'VASQUEZ FERNANDEZ, LUCILA',
    dni     : 27427628,
    tfn     : 988476654,
    ingresoT: '6000.00',
  }

  constructor() {
  }

  ngOnInit(): void {
    pdfMake.vfs = vfs; 
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
      Arial: {
        normal: 'arial.woff',
        bold: 'arialBold.woff',
        italics: 'arialItalic.woff',
        bolditalics: 'arialItalicBold.woff'
      },
      ArialMT: {
        normal: 'arialMT.woff',
        bold: 'arialMTBold.woff',
        italics: 'arialMTItalic.woff',
        bolditalics: 'arialMTItalicBold.woff'
      },
    };
    const fecha = new Date();
    let   counter = 0;
    const docDefinition: any = {
      info: { title: 'Document' },
      pageSize: 'A4',
      pageOrientation: 'portrait',
      defaultStyle: {
        font: 'ArialMT'
      },
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
          fontSize : 16,
        },
        { text     : 'POSTULANTE ' + '\t\t' + this.postulante.grado + '\t\t' + this.postulante.nivel + '\t\t' + this.postulante.sede,
          fontSize : 15.5,
        },
        {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},
        {
          fontSize: 6.5,
          layout: {
            hLineColor: (i: any, node: any) => {
              const campos = [1, 3, 5, 7, 9, 12, 14, 16, 18, 21, 23, 26, 29, 30, 31, 32, 34, 36];
              counter++;
              if (campos.includes(counter)) return 'white';
                else {
                  if(counter == 38) counter = 0; 
                  return '#BDBDBD'
                };
            },
            vLineColor: 'white' ,
            paddingLeft   : () => { return 8; },
            paddingRight  : () => { return 8; },
            paddingTop    : () => { return 8; },
            paddingBottom : () => { return 0.5; }
          },
          table: {
            body: [
              [ {text: 'DATOS:', colSpan: 9, fontSize: 10,}, '', '', '', '', '', '', '', ''],
              [ {text: 'DNI:', bold: true, font: 'Arial'},
                {text: this.postulante.dni + '\n'},
                {text: 'POSTULANTE:', bold: true, colSpan: 2, font: 'Arial'}, '',
                {text: this.postulante.nombre, colSpan: 3}, '', '',
                {text: 'F.NAC:', bold: true, font: 'Arial'}, 
                {text: this.postulante.fNac}
              ],
              [ {text: 'EDAD:', bold: true, colSpan: 1, font: 'Arial'},
                {text: this.postulante.edad + ' AÑOS'},
                {text: 'SEXO:', bold: true, colSpan: 1, font: 'Arial'},
                {text: this.postulante.sexo,},
                {text: 'TELÉF SMS:', bold: true, font: 'Arial'},
                {text: this.postulante.tfnSMS, colSpan: 2}, '',
                {text: 'OTROS TELÉF:', bold: true, font: 'Arial'},
                {text: this.postulante.otrosTfn}
              ],
              [ {text: 'DIRECCIÓN:', bold: true, colSpan: 2, font: 'Arial'}, '',
                {text: this.postulante.direccion, colSpan: 3}, '', '',
                {text: 'DISTRITO:', bold: true, font: 'Arial'},
                {text: this.postulante.distrito, colSpan: 3}, '', ''
              ],
              [ {text: 'OBSERVACIONES:', bold: true, colSpan: 2, font: 'Arial'}, '',
                {text: this.postulante.observaciones, colSpan: 7}, '', '', '', '', '', ''
              ],
              [ {text: 'ALUMNO(A) VIVE CON:', bold: true, colSpan: 2, font: 'Arial'}, '',
                {text: this.postulante.viveCon, alignment : 'center', colSpan: 3}, '', '',
                {text: 'RELIGIÓN:', bold: true, font: 'Arial'},
                {text: this.postulante.religion, alignment : 'center', colSpan: 3}, '', ''
              ],
              [ {text: 'COLEGIO:', colSpan: 9, fontSize: 10}, '', '', '', '', '', '', '', ''],
              [ {text: 'PROCEDENCIA:', bold: true, colSpan: 2, font: 'Arial'}, '',
                {text: this.postulante.procedencia, colSpan: 7}, '', '', '', '', '', ''
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
              counter++;
              if (campos.includes(counter)) return 'white';
                else {
                  if(counter == 49) counter = 0; 
                  return '#BDBDBD'
                };
            },
            vLineColor: 'white' ,
            paddingLeft   : () => { return 8; },
            paddingRight  : () => { return 8; },
            paddingTop    : () => { return 8; },
            paddingBottom : () => { return 0.5; }
          },
          table: {
            body: [
              [ {text: this.pariente.relacion + ':', colSpan: 9, fontSize: 8.5, font: 'Arial'}, '', '', '', '', '', '', '', ''],
              [ {text: 'DNI:', bold: true, font: 'Arial'},
                {text: this.pariente.dni, colSpan: 1},
                {text: 'NOMBRE:', bold: true, font: 'Arial'}, 
                {text: this.pariente.nombre, colSpan: 4}, '','', '',
                {text: 'F.NAC:', bold: true, font: 'Arial'}, 
                {text: this.pariente.fNac}
              ],
              [ {text: 'DIRECCIÓN:', bold: true, font: 'Arial'},
                {text: this.pariente.direccion, colSpan: 4}, '', '', '',
                {text: 'SMS:', bold: true, font: 'Arial'},
                {text: this.pariente.sms, colSpan: 1},
                {text: 'TELÉF:', bold: true, colSpan: 1, font: 'Arial'},
                {text: this.pariente.tfn}
              ],
              [ {text: 'EMAIL:', bold: true, font: 'Arial'},
                {text: this.pariente.email, colSpan: 4}, '', '', '',
                {text: 'PROF:', bold: true, font: 'Arial'},
                {text: this.pariente.prof, colSpan: 3}, '', ''
              ],
              [ {text: 'CENT. LABORAL:', bold: true, font: 'Arial'},
                {text: this.pariente.centLaboral, colSpan: 4}, '', '', '',
                {text: 'CARGO:', bold: true, colSpan: 1, font: 'Arial'},
                {text: this.pariente.cargo, colSpan: 3}, '', ''
              ],
              [ {text: 'TELF TRABAJO:', bold: true, colSpan: 1, font: 'Arial'},
                {text: this.pariente.tfnTrabajo, colSpan: 4}, '', '', '',
                {text: 'INGRESO MENSUAL:', bold: true, colSpan: 2, font: 'Arial'}, '',
                {text: this.pariente.ingresoM, colSpan: 2}, ''
              ],
              [ {text:' ', colSpan: 9, fontSize: 1}, '', '', '', '', '', '', '', ''],
              [ {text: 'RESP. DE PAGOS:', bold: true, colSpan: 1, font: 'Arial'},
                {text: this.responsable.nombre, colSpan: 4}, '', '', '',
                {text: 'DNI:', bold: true, colSpan: 1, font: 'Arial'},
                {text: this.responsable.dni,},
                {text: 'TÉLEF:', bold: true, colSpan: 1, font: 'Arial'},
                {text: this.responsable.tfn}
              ],
              [ {text: '', colSpan: 5}, '', '', '', '',
                {text: 'INGRESO TOTAL:', bold: true, colSpan: 2, font: 'Arial'}, '',
                {text: this.responsable.ingresoT, colSpan: 2}, ''
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
                        'YO, ' + this.pariente.nombre + ', DNI N°' + this.pariente.dni + 
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
          lineHeight : 1.5,
          characterSpacing: 0.1,
          alignment  : 'justify',
        },
        {text: '\n', fontSize: 14},
        { text       : '' + this.localidad + ', ' + fecha.toLocaleDateString('es-PE', { day: '2-digit' }) +
                       ' de ' + fecha.toLocaleDateString('es-PE', { month: 'long' }) +
                       ' del '+ fecha.toLocaleDateString('es-PE', { year: 'numeric' }),
          fontSize   : 6.5,
          alignment  : 'right',
          margin     : [0, 0, 0, 20]
        },
        { columns: [ 
          { columns: [ {width: 120, text: ' '} ,{
              margin: [0, 60, 0, 0],
              fontSize: 11,
              layout: {
                hLineColor: () => {
                  counter++;
                  if (counter == 3) return 'white';
                    else {
                      if(counter == 4) counter = 0; 
                      return 'black'
                    };
                },
                vLineColor: 'white' ,
                paddingLeft   : () => { return 65; },
                paddingRight  : () => { return 65; },
                paddingTop    : () => { return 5; },
                paddingBottom : () => { return 5; }
              },
              table: { body: [[ 'FIRMA' ]]}
            }]
          },
          { fontSize: 6.5,
            width: 200,
            layout: {
              hLineColor: 'black' ,
              vLineColor: 'black' ,
              paddingLeft   : () => { return 15; },
              paddingRight  : () => { return 15; },
              paddingTop    : () => { return 5; },
              paddingBottom : () => { return 80; }
            },
            table: { body: [[ 'Huella digital' ]]}}
        ]}
      ]
    };  

    pdfMake.createPdf(docDefinition).open();  
  }
  

}
