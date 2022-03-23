import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-multistepform",
  templateUrl: "./multistepform.component.html",
  styleUrls: ["./multistepform.component.scss"],
})
export class MultistepformComponent implements OnInit {
  data!: Array<any>;
  stepItems: Array<any>;
  startingIndex: number;
  countSteps: number;
  public allFormsData = [];
  public formValues = {};

  constructor() {
    this.startingIndex = 0;
  }

  ngOnInit() {
    this.data = [
      {
        stepname: "preparation",
        formFields: [
          {
            key: "Document upload",
            input: "file",
            valids: [],
          },
        ],
      },
      {
        stepname: "informations",
        formFields: [
          {
            key: "Document title",
            input: "text",
            valids: [
              {
                valid: "required",
                error: "Document title is required",
              },
              {
                valid: "minlength",
                length: 5,
                error: "Document title must be at least 5 characters",
              },
            ],
          },
          {
            key: "Document commentaries",
            input: "textarea",
            valids: [],
          },
          {
            key: "Electronic message",
            input: "textarea",
            valids: [
              {
                valid: "required",
                error: "Electronic message is required",
              },
              {
                valid: "minlength",
                length: 5,
                error: "Electronic message must be at least 5 characters",
              },
            ],
          },
          {
            key: "Expiration Date",
            input: "date",
            valids: [
              {
                valid: "required",
                error: "Expiration date is required",
              },
            ],
          },
          {
            key: "Authentication mode",
            input: "select",
            items: [
              {
                name: "push",
                id: 0,
              },
              {
                name: "pwd",
                id: 1,
              },
              {
                name: "oath",
                id: 2,
              },
              {
                name: "smsOtp",
                id: 3,
              },
            ],
            valids: [
              {
                valid: "required",
                error: "Authentication mode is required",
              },
            ],
          },
        ],
      },
      {
        stepname: "signataires",
        formFields: [
          {
            key: "signataires-list",
            input: "drag-and-drop",
          },
        ],
      },
    ];

    this.stepItems = this.data.map((ele) => ele.stepname);
    if (this.stepItems) {
      this.countSteps = this.stepItems.length;
    }
  }

  getFormData(formData: { formName: any }) {
    const matchingIndex = this.allFormsData.findIndex(
      (ele) => ele.formName === formData.formName
    );
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
    const mathcingFormData = this.allFormsData.find(
      (ele) => ele.formName === this.stepItems[this.startingIndex]
    );
    if (mathcingFormData && Object.keys(mathcingFormData).length > 0) {
      this.setFormData(mathcingFormData);
    }
  }

  submitTotalFormData() {
    console.log("All Form Value => ", this.allFormsData);
  }
}
