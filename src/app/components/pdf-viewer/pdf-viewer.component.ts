import { Component, OnInit, ViewChild } from "@angular/core";
import { DataService } from "src/app/shared/_services/data.service";
import { Router } from "@angular/router";
import { NgbPanelChangeEvent } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-pdf-viewer",
  templateUrl: "./pdf-viewer.component.html",
  styleUrls: ["./pdf-viewer.component.scss"],
})
export class PdfViewerComponent implements OnInit {


  pdf_base64_data: any;
  selected_signatories: any;
  edited_pdf_blob = [];
  images = [
    '../assets/images/Document1/Document-1.jpg',
    '../assets/images/Document1/Document-2.jpg',
    '../assets/images/Document1/Document-3.jpg',
    '../assets/images/Document1/Document-4.jpg',
    '../assets/images/Document1/Document-5.jpg',
    '../assets/images/Document1/Document-6.jpg'
  ];
  image = this.images[0];
  edge = {
    top: false,
    bottom: false,
    left: false,
    right: false
  };
  movingOffset = { x: 0, y: 0 };
  endOffset = { x: 0, y: 0 };
  inBounds = true;
  public totalPages = this.images.length;
  public currentpage = 0;
  stopped_output: any;
  positions = [];
  @ViewChild("block") block: any;
  @ViewChild("block1") block1: any;
  @ViewChild("block2") block2: any;
  @ViewChild("block3") block3: any;




  constructor(private dataService: DataService, private router: Router) { }


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



  checkEdge(event: any) {
    this.edge = event;
  }

  onStop(event: any) {
    console.log('stopped output:', event);
    this.stopped_output = event;
  }

  onMoving(event: any) {
    this.movingOffset.x = event.x;
    this.movingOffset.y = event.y;
  }

  onMoveEnd(event: any) {
    this.endOffset.x = event.x;
    this.endOffset.y = event.y;
    console.log("x= " + event.x);
    console.log("y= " + event.y);
    this.positions.push({
      pageNumber: this.currentpage,
      x: event.x,
      y: event.y,
      stopped_output: event
    });
  }

  showPage(index: number) {
    this.image = this.images[index];
  }

  confirmPosition() {
    console.log("positions: ", this.positions);
    this.dataService.getPositions(this.positions);
  }

  beforeChange($event: NgbPanelChangeEvent) {
    $event.preventDefault();
  }

  resetposition() {
    this.block.resetPosition();
    this.block1.resetPosition();
    this.block2.resetPosition();
    this.block3.resetPosition();
  }
}
