import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router } from '@angular/router';
import { Employeemodule } from 'src/app/modules/employee.module';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {

  employees: any;
  currentEmployees = null;
  currentIndex = -1;
  employeeName = '';
  items: Array<any>;
  pageOfItems: Array<any>;

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.retrieveEmployees();
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
  retrieveEmployees() {
    this.employeeService.getAll()
      .subscribe(
        data => {
          this.employees = data;
          this.items = this.employees;
        },
        error => {
          console.log(error);
        });
  }

  refreshList() {
    this.retrieveEmployees();
    this.currentEmployees = null;
    this.currentIndex = -1;
  }

  searchName() {
    this.employeeService.findByTitle(this.employeeName)
      .subscribe(
        data => {
          this.employees = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  addUser(): void {
    this.router.navigate(['create']);
  };

  deleteempdetails(emp: Employeemodule) {
    this.employeeService.delete(emp.employeeId)
      .subscribe(data => {
        this.retrieveEmployees();
      })
  }
}
