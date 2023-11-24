import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../../../service/employee.service";
import {Employee} from "../../../model/employee";
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';

@Component({
  selector: 'app-content-employee',
  templateUrl: './content-employee.component.html',
  styleUrls: ['./content-employee.component.css']
})
export class ContentEmployeeComponent implements OnInit{

  employees$ : Observable<Employee[]> = of([]);

  constructor(private employeeService: EmployeeService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.employees$ = this.employeeService.getEmployees();
  }

  openDialogDetails(emp: Employee) {
    this.employeeService.getEmployee(emp.email).subscribe(emp => {
      const dialogRef = this.dialog.open(EmployeeDetailsComponent,
        {data: emp, minWidth: '500px', minHeight:'200px'}
     );
    })
  }

}