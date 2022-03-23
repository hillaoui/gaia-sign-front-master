import {
  Component,
  OnInit,
  Input,
  ElementRef,
  Output,
  EventEmitter,
  OnChanges,
  Renderer2,
  ViewChild,
} from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  NgForm,
} from "@angular/forms";
import { Formtype } from "../../shared/enums/Formtype";
import { DataService } from "src/app/shared/_services/data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"],
})
export class FormComponent implements OnInit, OnChanges {
  // Declaring variables
  @Input() countSteps: any;
  @Input() stepNo!: number;
  @Input() formFields!: any[];
  @Input() formValues!: {};
  @Input() stepName: any;
  @Output() formData = new EventEmitter<any>();
  formName: any;
  @Output() newStep = new EventEmitter<any>();
  gender = "1";
  AllInformations: any[] = [];
  files: any[] = [];
  public filecontent: string[] = [];

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit() {}

  ngOnChanges() {
    this.getFormName();
  }

  getFormName() {
    this.formName = Object.keys(Formtype).find(
      (key) => Formtype[key] === this.stepName
    );
    if (this.formName) {
      this.createForm();
    }
  }

  createForm() {
    this.formName = new FormGroup({});
    if (this.formName && Object.keys(this.formValues).length > 0) {
      setTimeout(() => {
        this.formName.patchValue(this.formValues);
      });
    }
    this.validateForm();
  }

  validateForm() {
    this.formFields.forEach((element) => {
      const validatorsArr: ValidatorFn[] = [];
      if (element.valids?.length > 0) {
        element.valids.forEach(
          (val: {
            valid: string;
            validator: string | RegExp;
            length: number;
          }) => {
            if (val.valid === "required" || val.valid === "email") {
              validatorsArr.push(Validators[val.valid]);
            }
            if (val.valid === "pattern") {
              validatorsArr.push(Validators.pattern(val.validator));
            }
            if (val.valid === "minlength") {
              validatorsArr.push(Validators.minLength(val?.length));
            }
          }
        );

        this.formName.addControl(
          element.key,
          new FormControl("", validatorsArr)
        );
      } else {
        this.formName.addControl(element.key, new FormControl(""));
      }
    });
  }
  submit(myForm: NgForm) {
    this.AllInformations.push(this.formName.value);
    this.dataService.getFormData(this.AllInformations);
    if (this.stepNo === 2) {
      this.convertToBase64();
    }
    const obj = Object.assign(this.formName.value, { formName: this.stepName });
    this.formData.emit(obj);
    this.newStep.emit(this.stepNo + 1);
    myForm.resetForm();
    if (this.stepNo === 2) {
      this.router.navigate(["/preparedoc"]);
    }
  }

  gotoStep(stepNo: number) {
    this.newStep.emit(stepNo);
  }

  // file upload dnd

  // tslint:disable-next-line: member-ordering
  @ViewChild("fileDropRef", { static: false }) fileDropEl!: ElementRef;
  // tslint:disable-next-line: member-ordering

  /**
   * on file drop handler
   */
  onFileDropped($event: any[]) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files: any[]) {
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
    if (this.files.length === 1) {
      this.files.length = 0;
    }
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.fileDropEl.nativeElement.value = "";
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  convertToBase64() {
    // Check File is not Empty
    if (this.files?.length > 0) {
      let filtered_files = this.files.filter(function (elem, index, self) {
        return index === self.indexOf(elem);
      });
      // tslint:disable-next-line: prefer-const
      for (let item of filtered_files) {
        // Select the file at index from list
        const fileToLoad = item;
        // FileReader funthis.filesction for read the file.
        const fileReader = new FileReader();
        // tslint:disable-next-line: prefer-const
        let base64;

        // Onload of file read the file content
        fileReader.onload = (fileLoadedEvent) => {
          base64 = fileLoadedEvent.target.result;
          this.filecontent.push(base64);
          // Print data in console
          console.log("filecontent", this.filecontent);
        };
        this.dataService.getPdfBase64Data(this.filecontent);
        // Convert data to base64
        fileReader.readAsDataURL(fileToLoad);
        // tslint:disable-next-line: prefer-const
      }
    }
  }
}
