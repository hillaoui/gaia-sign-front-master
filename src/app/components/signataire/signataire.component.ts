import { Component, ElementRef, OnInit } from "@angular/core";
import { DataService } from "src/app/shared/_services/data.service";

@Component({
  selector: "app-signataire",
  templateUrl: "./signataire.component.html",
  styleUrls: ["./signataire.component.scss"],
})
export class SignataireComponent implements OnInit {

  positions: any;
  images = [
    '../assets/images/Document1/Document-1.jpg',
    '../assets/images/Document1/Document-2.jpg',
    '../assets/images/Document1/Document-3.jpg',
    '../assets/images/Document1/Document-4.jpg',
    '../assets/images/Document1/Document-5.jpg',
    '../assets/images/Document1/Document-6.jpg',
  ];
  public totalPages = this.images.length - 1;
  public currentpage = 0;
  edge = {
    top: true,
    bottom: true,
    left: true,
    right: true
  };
  movingOffset = { x: 0, y: 0 };
  endOffset = { x: 0, y: 0 };
  inBounds = true;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.currentpage = 1;
    this.dataService.shared_positions.subscribe((data) => {
      this.positions = data;
    });
    console.log("Positions: ", this.positions);
  }

  // show the previous page
  public previous() {
    if (this.currentpage > 0) {
      if (this.currentpage === 1) {
        this.currentpage = this.totalPages;
      } else {
        this.currentpage--;
      }
    }
  }

  // show the next page
  public next() {
    if (this.totalPages > this.currentpage) {
      this.currentpage++;
    } else {
      this.currentpage = 1;
    }
  }
}
