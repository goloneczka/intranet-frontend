import {Component, Input, OnInit} from '@angular/core';
import {Employee, EmployeeDepartment, employeeKeys} from "../../../../model/employee";
import {EmployeeService} from "../../../../service/employee.service";

@Component({
  selector: 'app-content-employee-department',
  templateUrl: './content-employee-department.component.html',
  styleUrls: ['./content-employee-department.component.css']
})
export class ContentEmployeeDepartmentComponent implements OnInit {

  displayedColumns = employeeKeys;

  @Input('employeeDepartment')
  employeeDepartment!: EmployeeDepartment;

  matEmployees!: (Employee | String)[];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.matEmployees = this.employeeDepartment?.employeeList;
    this.fullFillMatEmployees(this.employeeDepartment?.uuid!);
  }

  //TODO DISPLAY IN TREE WAY INSTEAD
  private fullFillMatEmployees(teamUuid : string) {
    const promises : Promise<any>[] = [];

    this.employeeService.getEmployeesWithTeams(teamUuid).subscribe(async childData => {

      for (const department of childData) {
        promises.push(this.dataPromise(department));
        this.fullFillMatEmployees(department.uuid);
      }
      const result = await Promise.all(promises);
      this.matEmployees = [...this.matEmployees, ...result.flat()];
      console.log(this.matEmployees)
    });
  }

  private dataPromise(data : EmployeeDepartment) {
    return new Promise((res, _) => {
      const matEmployee = [new String(data.team), ...data.employeeList]
      res(matEmployee);
    })
  }

  isGroup(_: number, item : Employee | String) {
    return item instanceof String;
  }
}




// @Input('employees')
// employees: Employee[] | undefined = [];
//
// displayedColumns = employeeKeys;
// matEmployees!: MatTableDataSource<Employee | EmployeeGroupBy>;
//
// ngOnInit(): void {
//   this.matEmployees = new MatTableDataSource(this.initGroupedEmployees());
// }
//
// isGroup(_: number, item: Employee | EmployeeGroupBy): boolean {
//   return item instanceof EmployeeGroupBy;
// }
//
// private initGroupedEmployees(): (Employee | EmployeeGroupBy)[] {
//   const sortEmployees = this.employees?.sort((it, next) =>
//     it.group?.localeCompare(next.group)
//   );
//
//   const groupedEmployees: (Employee | EmployeeGroupBy)[] = [];
//   sortEmployees?.forEach((it, ind, _) => {
//     if (!groupedEmployees.find(nestedIt => nestedIt instanceof EmployeeGroupBy && nestedIt.group === it.group)) {
//       groupedEmployees.push(new EmployeeGroupBy(it.group));
//     }
//     groupedEmployees.push(it);
//   });
//   return groupedEmployees;
// }
