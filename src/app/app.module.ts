import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { AppComponent } from "./app.component";
import { MultistepformComponent } from "./components/multistepform/multistepform.component";
import { FormComponent } from "./components/form/form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FocusDirective } from "./shared/_directives/focus.directive";
import { DndDirective } from "./shared/_directives/dnd.directive";
import { DragAndDropListComponent } from "./components/drag-and-drop-list/drag-and-drop-list.component";
import { HeaderComponent } from "./components/header/header.component";
import { Ng2SearchPipeModule } from "./shared/_pipes/filter.module";
import { PdfViewerComponent } from "./components/pdf-viewer/pdf-viewer.component";
import { DndModule } from "ngx-drag-drop";
import { SignataireComponent } from "./components/signataire/signataire.component";
import { AppRoutingModule } from "./app-routing.module";
import { AngularDraggableModule } from 'angular2-draggable';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    MultistepformComponent,
    FormComponent,
    FocusDirective,
    DndDirective,
    DragAndDropListComponent,
    HeaderComponent,
    PdfViewerComponent,
    SignataireComponent,
  ],
  providers: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    Ng2SearchPipeModule,
    DndModule,
    AppRoutingModule,
    AngularDraggableModule,
    NgbModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
