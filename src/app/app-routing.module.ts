import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { SignataireComponent } from "./components/signataire/signataire.component";
import { MultistepformComponent } from "./components/multistepform/multistepform.component";
import { PdfViewerComponent } from "./components/pdf-viewer/pdf-viewer.component";

const routes: Routes = [
  { path: "signdoc", component: SignataireComponent },
  { path: "preparedoc", component: MultistepformComponent },
  { path: "editdoc", component: PdfViewerComponent },
  { path: "", redirectTo: "/preparedoc", pathMatch: "full" },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
