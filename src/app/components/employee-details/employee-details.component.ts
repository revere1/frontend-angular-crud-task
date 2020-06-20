import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  currentEmployee = null;
  message = '';
  url = '';

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.message = '';
    this.getEmployee(this.route.snapshot.paramMap.get('id'));
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
     const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        //this.url = event.target.result;
      }
    }
  }
  public delete(){
    this.url = null;
  }

  getEmployee(id) {
    this.employeeService.get(id)
      .subscribe(
        data => {
          this.currentEmployee = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updatePublished(status) {
    const data = {
      firstName: this.currentEmployee.firstName,
      lastName: this.currentEmployee.lastName,
      employeeName: this.currentEmployee.employeeName,
      doj: this.currentEmployee.doj,
      dob: this.currentEmployee.dob,
      age: this.currentEmployee.age,
    };

    this.employeeService.update(this.currentEmployee.id, data)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  updateEmployee() {
    this.employeeService.update(this.currentEmployee.employeeId, this.currentEmployee)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The employee was updated successfully!';
          //this.router.navigate(['/employees']);
        },
        error => {
          console.log(error);
        });
  }

  deleteEmployee() {
    this.employeeService.delete(this.currentEmployee.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/employees']);
        },
        error => {
          console.log(error);
        });
  }
}
