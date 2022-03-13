import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-multistepform',
  templateUrl: './multistepform.component.html',
  styleUrls: ['./multistepform.component.scss']
})
export class MultistepformComponent implements OnInit {
  @Input() data: any[];
  stepItems: Array<any>;
  startingIndex: number;
  countSteps: number;
  public allFormsData = [];
  public formValues = {};

  constructor() {
    this.startingIndex = 0;
  }

  ngOnInit() {
    this.stepItems = this.data.map(ele => ele.stepname);
    if (this.stepItems) {
      this.countSteps = this.stepItems.length;
    }
  }

  getFormData(formData: { formName: any; }) {
    const matchingIndex = this.allFormsData.findIndex(ele => ele.formName === formData.formName);
    if (matchingIndex > -1) {
      Object.assign(this.allFormsData[matchingIndex], formData);
    } else {
      this.allFormsData.push(formData);
    }
  }

  setFormData(mathcingFormData: {}) {
    this.formValues = mathcingFormData;
  }

  onnewStep(event: number) {
    this.startingIndex = event;
    if (this.startingIndex === this.countSteps - 1) {
      this.submitTotalFormData();
    }
    const mathcingFormData = this.allFormsData.find(ele => ele.formName === this.stepItems[this.startingIndex]);
    if (mathcingFormData && Object.keys(mathcingFormData).length > 0) {
      this.setFormData(mathcingFormData);
    }
  }

  submitTotalFormData() {
    console.log('All Form Value => ', this.allFormsData);
  }
}
