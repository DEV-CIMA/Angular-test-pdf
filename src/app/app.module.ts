import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { PdfGeneratorComponent } from './pdf-generator/pdf-generator.component';
import { RecordComponent } from './record/record.component';
import { PdfGeneratorEconomicoComponent } from './pdf-generator-economico/pdf-generator-economico.component';
import { PdfGeneratorConstVacanteComponent } from './pdf-generator-const-vacante/pdf-generator-const-vacante.component';
import { PdfContanciaComponent } from './pdf-contancia/pdf-contancia.component';
import { RouterModule } from '@angular/router';
import { PdfDeclaracionJuradaComponent } from './pdf-declaracion-jurada/pdf-declaracion-jurada.component';

@NgModule({
  declarations: [
    AppComponent,
    DragDropComponent,
    RecordComponent,
    PdfGeneratorComponent,
    PdfGeneratorEconomicoComponent,
    PdfGeneratorConstVacanteComponent,
    PdfContanciaComponent,
    PdfDeclaracionJuradaComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
        {path:'constanciaVacante', component: PdfContanciaComponent},
        {path:'admisionFicha', component: PdfGeneratorComponent},
        {path:'modeloVacante', component: PdfGeneratorConstVacanteComponent},
        {path:'recibo', component: PdfGeneratorEconomicoComponent},
        {path:'declaracionJurada', component: PdfDeclaracionJuradaComponent},

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }






