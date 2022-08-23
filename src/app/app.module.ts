import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { PdfGeneratorComponent } from './pdf-generator/pdf-generator.component';
import { RecordComponent } from './record/record.component';
import { PdfGeneratorEconomicoComponent } from './pdf-generator-economico/pdf-generator-economico.component';

@NgModule({
  declarations: [
    AppComponent,
    DragDropComponent,
    RecordComponent,
    PdfGeneratorComponent,
    PdfGeneratorEconomicoComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
