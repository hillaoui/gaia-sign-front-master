import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/shared/_services/data.service';


@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements OnInit {

  pdf_base64_data: any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.shared_pdf_base64_details.subscribe(data => {
      this.pdf_base64_data = data;
    });
    console.log('lets test it out!!', this.pdf_base64_data);
  }
}
