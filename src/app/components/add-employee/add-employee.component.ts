import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
//import { FileUploadService } from "../shared/file-upload.service";
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  image: string = null;
  employee = {
    firstName: '',
    lastName: '',
    employeeName: '',
    doj: '',
    dob: '',
    age: '',
    file: ''
  };
  submitted = false;
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  constructor(
    private employeeService: EmployeeService,
    //public fileUploadService: FileUploadService
  ) { }

  ngOnInit() {
  }
  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
      console.log("AddEmployeeComponent -> reader.onload -> this.previewUrl", this.previewUrl)
    }
  }

  saveEmployee() {
    this.loading = true;
    const data = {
      firstName: this.employee.firstName,
      lastName: this.employee.lastName,
      employeeName: this.employee.employeeName,
      doj: this.employee.doj,
      dob: this.employee.dob,
      age: this.employee.age,
      file:  this.previewUrl 

    };
    console.log("AddEmployeeComponent -> saveEmployee -> data", data)

    this.employeeService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newEmployee() {
    this.submitted = false;
    this.employee = {
      firstName: '',
      lastName: '',
      employeeName: '',
      doj: '',
      dob: '',
      age: '',
      file: ''
    };
  }

}
