import { Component } from '@angular/core';
import {Observable, of} from "rxjs";
import {Post} from "../../../model/post";
import {EmployeeService} from "../../../service/employee.service";
import {Employee} from "../../../model/employee";

@Component({
  selector: 'app-content-employee',
  templateUrl: './content-employee.component.html',
  styleUrls: ['./content-employee.component.css']
})
export class ContentEmployeeComponent {

  employees$: Observable<Employee[]> = of([]);

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employees$ = this.employeeService.getEmployees()
  }

}
