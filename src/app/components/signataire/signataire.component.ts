import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/shared/_services/data.service";

@Component({
  selector: "app-signataire",
  templateUrl: "./signataire.component.html",
  styleUrls: ["./signataire.component.scss"],
})
export class SignataireComponent implements OnInit {
  public service = "http://localhost:4628/api/pdfviewer";

  edited_pdf_base64_data: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.shared_blob_pdf_details.subscribe((data) => {
      this.edited_pdf_base64_data = data;
    });
    console.log("edited_pdf_base64_data", this.edited_pdf_base64_data);
  }

  public download_pdf() {
    let viewer = (<any>document.getElementById("pdfViewer")).ej2_instances[0];
    viewer.download();
  }
}
