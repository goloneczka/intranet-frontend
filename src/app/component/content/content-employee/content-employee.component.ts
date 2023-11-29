import {Component, OnInit, ViewChild} from '@angular/core';
import {EmployeeService} from "../../../service/employee.service";
import {Employee, Team, TeamTree} from "../../../model/employee";
import { MatDialog } from '@angular/material/dialog';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { NewEmployeeComponent } from './new-employee/new-employee.component';

import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, pairwise, startWith } from 'rxjs';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { NewEmployeeTeamComponent } from './new-employee-team/new-employee-team.component';

@Component({
  selector: 'app-content-employee',
  templateUrl: './content-employee.component.html',
  styleUrls: ['./content-employee.component.css']
})
export class ContentEmployeeComponent implements OnInit{

  @ViewChild(NewEmployeeComponent)
  newEmployeeChild!: NewEmployeeComponent;
  @ViewChild(NewEmployeeTeamComponent)
  newEmployeeTeamChild!: NewEmployeeTeamComponent;

  employees : Employee[] = [];
  filteredEmployees : Employee[] = [];
  teamNames : Set<String> = new Set();

  teamTree! : TeamTree;
  teamNamesToFilter : string[] = []; 

  filterForm: FormGroup;

  isUserAuthenticated: boolean = LocalStorageService.isAuthenticated();

  constructor(private employeeService: EmployeeService, public dialog: MatDialog, private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      name: [''],
      teamName: ['']
    });
  }

  ngOnInit(): void {
    this.initEmployees();

    this.filterForm.valueChanges
      .pipe(
          debounceTime(300),
          startWith({teamName: '', name: ''}),
          pairwise()
      ).subscribe(([prev, next]) => {
          if(prev.teamName !== next.teamName){
            this.teamNamesToFilter = this.employeeService.gesNestedTeamsInTree(next.teamName, this.teamTree);
          }
          this.filterData(next);
      });
  }

  private initEmployees() {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = this.filteredEmployees = data;
      
      const teamNamesArray = this.employees.map(it => it.teamName).sort();
      teamNamesArray.unshift('');
      this.teamNames = new Set(teamNamesArray);

      this.employeeService.getTeamsTree().subscribe(data => {
        this.teamTree = data;
      })
    });
  }


  private filterData(filters: { name: string; teamName: string }) {
    this.filteredEmployees = this.employees.filter((item) => {
      const nameMatches = (item.firstName + ' ' + item.lastName).toLowerCase().startsWith(filters.name.toLowerCase()) || 
                          (item.lastName + ' ' + item.firstName).toLowerCase().startsWith(filters.name.toLowerCase());
      const categoryMatches = this.teamNamesToFilter.length ? this.teamNamesToFilter.includes(item.teamName) : true;
      return nameMatches && categoryMatches;
    });
  }

  openDialogDetails(emp: Employee) {
    this.employeeService.getEmployee(emp.email).subscribe(emp => {
      this.dialog.open(EmployeeDetailsComponent,
        {data: emp, minWidth: '500px', minHeight:'200px'}
     );
    })
  }

  addEmployee() {
    this.newEmployeeChild.shouldDisplayForm(true);
  }

  saveEmployee(emp : Employee) {
    this.employeeService.saveEmployee(emp).subscribe(_ => {
      this.initEmployees();
    });
  }

  addTeam() {
    this.newEmployeeTeamChild.shouldDisplayForm(true);
  }

  saveTeam(team : Team) { 
    
  }

}
