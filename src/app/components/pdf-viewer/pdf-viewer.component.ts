import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/shared/_services/data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-pdf-viewer",
  templateUrl: "./pdf-viewer.component.html",
  styleUrls: ["./pdf-viewer.component.scss"],
})
export class PdfViewerComponent implements OnInit {

  pdf_base64_data: any;
  selected_signatories: any;
  edited_pdf_blob = [];
  public imgSign = '';
  public isCropImage = false;
  images = [
    '../assets/images/Document1/Document-1.jpg',
    '../assets/images/Document1/Document-2.jpg',
    '../assets/images/Document1/Document-3.jpg',
    '../assets/images/Document1/Document-4.jpg',
    '../assets/images/Document1/Document-5.jpg',
    '../assets/images/Document1/Document-6.jpg',
  ];

  edge = {
    top: true,
    bottom: true,
    left: true,
    right: true
  };
  movingOffset = { x: 0, y: 0 };
  endOffset = { x: 0, y: 0 };

  fields = [{
    id: 1,
    name: 'signatureField',
  }];

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

  checkEdge(event: any) {
    this.edge = event;
    console.log('edge:', event);
  }
  onStart(event: any) {
    console.log('started output:', event);
  }

  onStop(event: any) {
    console.log('stopped output:', event);
  }

  onMoving(event: any) {
    this.movingOffset.x = event.x;
    this.movingOffset.y = event.y;
    console.log('x= ' + event.x);
    console.log('y= ' + event.y);
  }

  onMoveEnd(event: any) {
    this.endOffset.x = event.x;
    this.endOffset.y = event.y;
  }

  showPage(index: number) {
    let images_collection = (<any>document.getElementsByClassName("pdf-image-container"));
    images_collection[index].scrollIntoView({
      behavior: "auto",
      block: "start",
      inline: "nearest"});
  }
}
