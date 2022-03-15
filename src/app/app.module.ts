import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppComponent } from './app.component';
import { MultistepformComponent } from './components/multistepform/multistepform.component';
import { FormComponent } from './components/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResultComponent } from './components/result/result.component';
import { FocusDirective } from './shared/_directives/focus.directive';
import { DndDirective } from './shared/_directives/dnd.directive';
import { ProgressComponent } from './components/progress/progress.component';
import { DragAndDropListComponent } from './components/drag-and-drop-list/drag-and-drop-list.component';
import { HeaderComponent } from './components/header/header.component';
import { Ng2SearchPipeModule } from './shared/_pipes/filter.module';
import { PdfViewerComponent } from './components/pdf-viewer/pdf-viewer.component';


@NgModule({
  declarations: [
    AppComponent,
    MultistepformComponent,
    FormComponent,
    ResultComponent,
    FocusDirective,
    DndDirective,
    ProgressComponent,
    DragAndDropListComponent,
    HeaderComponent,
    PdfViewerComponent,
  ],
  providers: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    Ng2SearchPipeModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
