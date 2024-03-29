import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  constructor() { }

  // tslint:disable-next-line: member-ordering
  private form_details = new BehaviorSubject([]);
  shared_form_details = this.form_details.asObservable();

  // tslint:disable-next-line: member-ordering
  private selected_signatories = new BehaviorSubject([]);
  // tslint:disable-next-line: member-ordering
  selected_signatories_details = this.selected_signatories.asObservable();

  // tslint:disable-next-line: member-ordering
  private pdf_base64_data = new BehaviorSubject([]);
  shared_pdf_base64_details = this.pdf_base64_data.asObservable();


  getFormData(data: any) {
    this.form_details.next(data);
  }

  getSelectedSignatoriesData(data: any) {
    this.selected_signatories.next(data);
  }

  getPdfBase64Data(data: any) {
    this.pdf_base64_data.next(data);
  }
}
