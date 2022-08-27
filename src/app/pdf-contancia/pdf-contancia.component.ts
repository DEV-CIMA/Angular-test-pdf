import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import { vfs } from '../vfs_fonts';

@Component({
  selector: 'app-pdf-contancia',
  templateUrl: './pdf-contancia.component.html',
  styleUrls: ['./pdf-contancia.component.css']
})
export class PdfContanciaComponent implements OnInit {

  public vacante ={
    nombre: "MEDINA LEONARDO, RUBI ESMERALDA",
  }
  public anioEscolar   = 2022;
  public anioPosterior = 2023;
  public codigoModular = 1460740; 
  public fechaLimite   = new Date(2023, 0, 15);
  public localidad     = 'Chiclayo';
  public niveles       = [
      {
      id: 0,
      descripcion:"Nivel Inicial"
      },
      {
      id: 1,
      descripcion:"Nivel Primaria"
      },
      {
      id: 2,
      descripcion:"Nivel Secundaria"
      }
    ]
    ;

  public grado         = "SEGUNDO GRADO";
  public años         = "3 AÑOS";

  public cargo         = "Director";
  public remitente     = "Luis Ríos Garabito";

  public inicial = true;
  public primaria = false;
  public secundaria = false;
  constructor() { }

  ngOnInit(): void {
    pdfMake.vfs = vfs; 
    this.generatePDF();
  }
  generatePDF() {
    pdfMake.fonts  = {
      TimesNewRoman:{
        normal: 'times.ttf',
        bold: 'timesBold.ttf',
        bolditalics: 'timesItalicBold.woff2'
      }
    };
    const fecha    = new Date();
    const noBorder = [false, false, false, false];
    var   requisitos;
    var   tablePoints;
    var text1;
    var text2;
    if(this.inicial == true) {
      text1 = { text : [
              'El ',
              { text: this.cargo },
              ' de la Institución Educativa ',
              { text: 'CIMA', bold: true },
              ', con código modular ',
              { text: this.codigoModular, bold: true},
              ' (', { text: this.niveles[0].descripcion, bold: true }, ').'
              ],
              style : 'text'
              };
      text2 = { text: [
              '\nCuenta con una ',
              { text: 'vacante provisional', bold: true, italics: true },
              ' en nuestra institucion Educativa para  ',
              { text: this.años, bold:true, italics: true }, ' del ',
              { text: this.niveles[0].descripcion.toUpperCase(), bold:true, italics: true }, '.'
              ],
              style: 'text',
              };
      tablePoints = {
              layout: {
              paddingLeft   : () => { return 5; },
              paddingRight  : () => { return 0; },
              paddingTop    : () => { return 0; },
              paddingBottom : () => { return 10; },
              },
              table: {
                body: [
                  [ { text: '*\t*', color: 'white', border: noBorder },
                    { text: 'A.', border: noBorder },
                    { text: 'Copia DNI del (la) postulante.', border: noBorder },
                    { text: '* *', color: 'white', border: noBorder }
                  ],
                  [ { text: '', border: noBorder },
                    { text: 'B.', border: noBorder },
                    { text: 'Copia de la Partida de Nacimiento del (la) postulante.', border: noBorder },
                    { text: '', border: noBorder }
                  ],
                  [ { text: '', border: noBorder },
                    { text: 'C.', border: noBorder },
                    { text: 'Copia de tarjeta de vacunas.', border: noBorder },
                    { text: '', border: noBorder }
                  ],
                  [ { text: '', border: noBorder },
                    { text: 'D.', border: noBorder },
                    { text: 'Suscribir el Contrato de Servicios Educativos del año escolar ' + this.anioPosterior + '.', border: noBorder },
                    { text: '', border: noBorder }
                  ],
                  [ { text: '', border: noBorder },
                    { text: 'E.', border: noBorder },
                    { text: 'Declaración Jurada de los padres o apoderado año escolar ' + this.anioPosterior + '.', border: noBorder },
                    { text: '', border: noBorder }
                  ]
                ]
              },
              style: 'text',
              };
      requisitos = '\n';
      requisitos = '\n';
      
    } 
    else if(this.primaria == true){
      text1 = { text : [
              'El ',
              { text: this.cargo },
              ' de la Institución Educativa ',
              { text: 'CIMA', bold: true },
              ', con código modular ',
              { text: this.codigoModular, bold: true},
              ' (', { text: this.niveles[1].descripcion, bold: true }, ').'
              ],
              style : 'text'
              };
      text2 = { text: [
              '\nCuenta con una ',
              { text: 'vacante provisional', bold: true, italics: true },
              ' en nuestra institucion Educativa para  ',
              { text: this.grado, bold:true, italics: true }, ' del ',
              { text: this.niveles[1].descripcion.toUpperCase(), bold:true, italics: true }, '.'
              ],
              style: 'text',
              };
      tablePoints = {
              layout: {
              paddingLeft   : () => { return 5; },
              paddingRight  : () => { return 0; },
              paddingTop    : () => { return 0; },
              paddingBottom : () => { return 10; },
              },
              table: {
                body: [
                  [ { text: '*\t*', color: 'white', border: noBorder },
                    { text: 'A.', border: noBorder },
                    { text: 'Certificado de Estudios en original del año inmediatamente anterior que acredite haber culminado satisfactoriamente.', border: noBorder },
                    { text: '*\t*', color: 'white', border: noBorder }
                  ],
                  [ { text: '', border: noBorder },
                    { text: 'B.', border: noBorder },
                    { text: 'Ficha única de matrícula generada por el SIAGIE.', border: noBorder },
                    { text: '', border: noBorder }
                  ],
                  [ { text: '', border: noBorder },
                    { text: 'C.', border: noBorder },
                    { text: 'Resolucion Traslado virtual.', border: noBorder },
                    { text: '', border: noBorder }
                  ],
                  [ { text: '', border: noBorder },
                    { text: 'D.', border: noBorder },
                    { text: 'Suscribir el Contrato de Servicios Educativos del año escolar ' + this.anioPosterior + ' y la Declaración Jurada.', border: noBorder },
                    { text: '', border: noBorder }
                  ],
                ]
              },
              bold : true,
              style: 'text',
              };
      requisitos = 'En caso no se cumpliera con algunos de los requisitos previstos en los literales A, B y C, antes mencionados, no procederá la asignación de vacante.'
    }
    else if(this.secundaria==true){
      text1 = { text : [
              'El ',
              { text: this.cargo },
              ' de la Institución Educativa ',
              { text: 'CIMA', bold: true },
              ', con código modular ',
              { text: this.codigoModular, bold: true},
              ' (', { text: this.niveles[2].descripcion, bold: true }, ').'
              ],
              style : 'text'
              };
      text2 = { text: [
        '\nCuenta con una ',
        { text: 'vacante provisional', bold: true, italics: true },
        ' en nuestra institucion Educativa para  ',
        { text: this.grado, bold:true, italics: true }, ' del ',
        { text: this.niveles[2].descripcion.toUpperCase(), bold:true, italics: true }, '.'
        ],
        style: 'text',
              };
      tablePoints = {
              layout: {
              paddingLeft   : () => { return 5; },
              paddingRight  : () => { return 0; },
              paddingTop    : () => { return 0; },
              paddingBottom : () => { return 10; },
              },
              table: {
                  body: [
                    [ { text: '*\t*', color: 'white', border: noBorder },
                      { text: 'A.', border: noBorder },
                      { text: 'Certificado de Estudios en original del año inmediatamente anterior que acredite haber culminado satisfactoriamente.', border: noBorder },
                      { text: '*\t*', color: 'white', border: noBorder }
                    ],
                    [ { text: '', border: noBorder },
                      { text: 'B.', border: noBorder },
                      { text: 'Ficha única de matrícula generada por el SIAGIE.', border: noBorder },
                      { text: '', border: noBorder }
                    ],
                    [ { text: '', border: noBorder },
                      { text: 'C.', border: noBorder },
                      { text: 'Resolucion Traslado virtual.', border: noBorder },
                      { text: '', border: noBorder }
                    ],
                    [ { text: '', border: noBorder },
                      { text: 'D.', border: noBorder },
                      { text: 'Suscribir el Contrato de Servicios Educativos del año escolar ' + this.anioPosterior + ' y la Declaración Jurada.', border: noBorder },
                      { text: '', border: noBorder }
                    ],
                  ]
                },
                bold : true,
                style: 'text',
        };
        requisitos = 'En caso no se cumpliera con algunos de los requisitos previstos en los literales A, B y C, antes mencionados, no procederá la asignación de vacante.'
    }
    let docDefinition: any = {
      defaultStyle : {
        alignment  : 'justify',
        font       : 'TimesNewRoman',
        fontSize   : 11,
        lineHeight : 1.14,
      },
      info            : { title: 'ConstanciaProvisionalVacante' },
      pageOrientation : 'portrait',
      pageSize        : 'A4',
      styles: {
        text: {
          margin: [ 20,0, 20, 0],
        }
      },
      content: [
        { text      :  'CONSTANCIA PROVISIONAL DE VACANTE',
          alignment : 'center',
          bold      : true,
          fontSize  : 14,
          margin    : [ 0,  104, 0, 0 ],
        },
        { text      : ' ',
          fontSize  : 20,
        }, 
        text1, 
        { text : '\nHacen constar que:\n\n',
          bold : true,
          style: 'text'
        },
        { text      : this.vacante.nombre, 
          alignment : 'center',
          bold      : true,
          italics   : true
        },
         text2 ,
        { text: [ 
            '\nLa ', { text: 'Vacante definitiva', bold: true, italics: true },
            ' se asignará inmediatamente después que los padres o apoderados hayan cumplido con todos los requisitos indicados a continuación, necesarios para poder matricular correctamente en el año escolar ',
            { text: this.anioPosterior },
            ', tal como lo establece las disposiciones legales del Ministerio de Educación - MINEDU , y el Sistema de Información de Apoyo a la Gestión de la Institución - SIAGIE.\n\n'],
          style: 'text',
        }, tablePoints,
        { text : requisitos,
          style: 'text',
        },
        { text : [
            '\nNo obstante, lo contemplado anteriormente, esta constancia tendrá vigencia hasta el',
            ' '    + this.fechaLimite.toLocaleDateString('es-PE', { day: '2-digit' })  ,
            ' de ' + this.fechaLimite.toLocaleDateString('es-PE', { month: 'long' })   ,
            ' del '+ this.fechaLimite.toLocaleDateString('es-PE', { year: 'numeric' }) ,
            '. En caso sea necesario renovar este plazo, deberán solicitarlo.'
          ],
          style: "text",
        },
        { text : '\nSe expide la presente para los fines que estime conveniente.\n\n',
          style: "text",
        },
        { text : 'Atentamente\n',
          style: 'text',
        },
        { text : [
            this.localidad, 
            ', '   + fecha.toLocaleDateString('es-PE', { weekday: 'long' }) ,
            ' '    + fecha.toLocaleDateString('es-PE', { day: '2-digit' })  ,
            ' de ' + fecha.toLocaleDateString('es-PE', { month: 'long' })   ,
            ' del '+ fecha.toLocaleDateString('es-PE', { year: 'numeric' }) ,
          ],
          alignment : 'right',
          fontSize  : 10,
          style     :'text',
        },
        { layout: {
            paddingLeft   : () => { return 15; },
            paddingRight  : () => { return 15; },
            paddingTop    : () => { return 2; },
            paddingBottom : () => { return 0; },
            hLineStyle: () => { return {dash: {length: 2, space: 2}} },
          },
          table: {
            body: [
              [ { text: 'Prof. ' + this.remitente, bold: true, border: [false, true, false, false] } ],
              [ { text: this.cargo, border: noBorder } ],
            ]
          },
          alignment : 'center',
          margin    : [ 110, 45, 0, 0 ],
          fontSize  : 9
        },
      ],
    };
    
    pdfMake.createPdf(docDefinition).open();
  }
}
