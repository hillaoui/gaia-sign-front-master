import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/shared/_services/data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-pdf-viewer",
  templateUrl: "./pdf-viewer.component.html",
  styleUrls: ["./pdf-viewer.component.scss"],
})
export class PdfViewerComponent implements OnInit {
  public service = "http://localhost:4628/api/pdfviewer";

  pdf_base64_data: any;
  selected_signatories: any;
  edited_pdf_blob = [];

  public toolbarSettings = {
    showTooltip: true,
    toolbarItems: [
      "DownloadOption",
      "PageNavigationTool",
      "MagnificationTool",
      "PanTool",
      "SelectionTool",
      "SearchOption",
      "DownloadOption",
      "UndoRedoTool",
      "FormDesignerEditTool",
      "CommentTool",
    ],
  };

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.dataService.shared_pdf_base64_details.subscribe((data) => {
      this.pdf_base64_data = data;
    });
    console.log("pdfbase64", this.pdf_base64_data);
    this.dataService.selected_signatories_details.subscribe((data) => {
      this.selected_signatories = data;
    });
    console.log("lets see", this.selected_signatories);
  }

  signDocument() {
    this.dataService.getBlobPdfData(this.edited_pdf_blob);
    this.router.navigate(["signdoc"]);
  }

  exportForm(): any {
    let viewer = (<any>document.getElementById("pdfViewer")).ej2_instances[0];
    let formField = viewer.retrieveFormFields();
    this.dataService.getFormPdfData(formField);
    console.log(
      "Pdf Form data from service:",
      this.dataService.shared_form_pdf_details
    );
  }

  loadBase64string() {
    let viewer = (<any>document.getElementById("pdfViewer")).ej2_instances[0];
    let edited_pdf_blob = [];
    let pdf_base64_data = this.pdf_base64_data;

    viewer.saveAsBlob().then(function (value: any) {
      let data = value;
      let base64data;
      let reader = new FileReader();

      reader.onload = () => {
        base64data = reader.result;
        edited_pdf_blob.push(base64data);
        viewer.load(pdf_base64_data[0], null);
      };
      reader.readAsDataURL(data);
    });
    this.edited_pdf_blob = edited_pdf_blob;
  }
}
