import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../../../service/employee.service";
import {Employee, EmployeeDepartment, employeeKeys} from "../../../model/employee";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-content-employee',
  templateUrl: './content-employee.component.html',
  styleUrls: ['./content-employee.component.css']
})
export class ContentEmployeeComponent implements OnInit{

  departmentsWithEmployees : EmployeeDepartment[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getEmployeesWithTeams(null)
      .subscribe(data => { this.departmentsWithEmployees = data});
  }

}

//
// ngOnInit(): void {
//   this.employeeService.getEmployeesByDepartmentAndTeam().subscribe(data => {
//
//     const mapData = new Map(Object.entries(data));
//     mapData.forEach((val, key, _) => {
//       this.employeeDepartments.add(key);
//       this.employees.set(key, val as Employee[]);
//     })
//     console.log(this.employees);
//   });
// }
