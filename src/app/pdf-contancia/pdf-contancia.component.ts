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
 public localidad = 'Chiclayo';
  public anioEscolar =2022;
  public fechaLimite ="23/02/2022";
  public nivel="Nivel Secundaria";
  public titulo="Documento sin titulo";
  public codigoModular=1460740; 
  constructor() { }

  ngOnInit(): void {
    pdfMake.vfs = vfs; 
    this.generatePDF();
  }
  generatePDF() {
    const fecha = new Date();
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
    let docDefinition: any = {
      info: { title: 'Document' },
      pageSize: 'A4',
      pageOrientation: 'portrait',
      defaultStyle: {
        fontSize   : 11,
        lineHeight : 1.14,
        italics: true, 
        font:'ArialMT'
      },
      header: {
        margin: [21, 10],
        fontSize: 8,
        text: [fecha.toLocaleDateString() + ', ' + fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) +'\t\t\t\t\t\t\t\t\t'+
        '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t',{text: this.titulo, italics: false}]
      },

      footer: function(currentPage: any, pageCount:any) { 
        return {
          text: currentPage.toString() + '/' + pageCount,
          alignment : 'right',
          fontSize : 8,
          margin: [20, 0],
          italics: false
        }; 
      },
      content: [
        { text      :  {text: '\n\n\n\nCONSTANCIA PROVISIONAL DE VACANTE', bold: true},
        fontSize  : 15.5,
        alignment : 'center',
        margin: [ 74, 35, 74, 0 ],
        italics: false, 

        },
        { text      : ' ',
        fontSize  : 15,
        },
        { text       : [
          'El director de la Institución Educativa CIMA, con código modular ',{text:this.codigoModular, bold:true},
          '(',{text:this.nivel, bold:true},').'
         ],
          style: 'text',
          italics: false, 
        },
        
        { text: {text:'\nHacen constar que: \n', italics: true},
         style: 'text',
        },
        { text       : {text: '\n'+this.vacante.nombre, italics: true, bold:true},
        fontSize   : 10,
        lineHeight : 1.14,
        alignment  : 'center',
        margin: [ 74, 0, 74, 0 ],
        },
        { text: ['\nCuenta con una ',{text: 'vacante profesional', bold:true},' en nuestra institucion Educativa para del ',
                {text:this.nivel.toLocaleUpperCase(), bold:true},'.'],
          style: 'text',
        },
        { text: [ '\nLa',{text:'Vacante definitiva', bold:true},'se asignará inmediatamente después que los padres o apoderados '+ 
                'hayan cumplido con todos los requisitos indicados a continuación, necesarios para poder '+
                'matricular correctamente en el año escolar 2022, tal como lo establece las disposiciones '+
                'legales del Ministerio de Educación - MINEDU , y el Sistema de Información de Apoyo a la'+
                'Gestión de la Institución - SIAGIE.\n'],
          style: 'text',
        },
        
        {
          text:['\n']
        },
        {
          layout: {
            paddingLeft   : () => { return 5; },
            paddingRight  : () => { return 0; },
            paddingTop    : () => { return 0; },
            paddingBottom : () => { return 0; },
            vLineColor: 'white' ,
            hLineColor: 'white' ,
          
          }, // optional

          table: {

            border:0,
            // widths: [ '*', 'auto', 100, '*' ],
      
            body: [
              [ 'A.', 'Certificado de Estudios en original del año inmediatamente anterior que acredites haber culminado satisfactoriamente'],
              [ 'B.', 'Ficha única de matrícula generada por el SIAGIE.'],
              [ 'C.', 'Resolución de Traslado virtual.'],
              [ 'D.', 'Copia de DNI del (la) postulante.'],
              [ 'E.', 'Copia de la Partida de Nacimiento del (la) postulante.'],
              [ 'F.', 'Suscribir el Contrato de Servicios Educativos del año escolar '+this.anioEscolar+' y la Declaración Jurada.'],
            ]
          },
          style: 'text',

        },

        { text       : ['\nEn caso no se cumpliera con algunos de los requisitos previstos en los literales A, B y C, antes mencionados, no procederá la asignación de vacante.'],
          style: 'text',
        },
        { text : ['\nNo obstante lo contemplado anteriormente, esta constancia tendrá vigencia hasta el miércoles '+ 
                this.fechaLimite+'. En caso sea necesario renovar este plazo, deberán '+ 
                'solicitarlo.'],
          style: "text",
        },
        { text : ['\nSe expide la presente para los fines que estime conveniente.'],
        style: "text",
        },
        { text : ['\nAtentamente.'],
        style: 'text',
        },
        { text       : '\n\n'+this.localidad + ', ' + fecha.toLocaleDateString('es-PE', { day: '2-digit' }) +
        ' de ' + fecha.toLocaleDateString('es-PE', { month: 'long' }) +
        ' del '+ fecha.toLocaleDateString('es-PE', { year: 'numeric' }),
        fontSize   : 10,
        alignment  : 'right',
        style:'text',
        italics: false,
        }
      ],
      styles:{
        text:{
          alignment  : 'justify',
          margin: [ 74, 0, 74, 0 ],
        },
        lista:{
          alignment  : 'justify',
          margin: [ 85, 0, 74, 0 ],
        },
        
      },
    };
    
    pdfMake.createPdf(docDefinition).open();  
  }

}
