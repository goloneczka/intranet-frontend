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
import { EditEmployeeTeamDialogComponent } from './edit-employee-team-dialog/edit-employee-team-dialog.component';


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
      
      this.employeeService.getTeamsTree().subscribe(data => {
        this.teamTree = data;
        this.teamNames = new Set(this.employeeService.gesNestedTeamsInTree('', this.teamTree).sort());
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

  openDialogEdit(empToEdit: Employee) {
    this.employeeService.getEmployee(empToEdit.email).subscribe(emp => {
    
    const dialogRef = this.dialog.open(EditEmployeeTeamDialogComponent, {
        data: {'emp': emp, 'teamNames': this.teamNames},
        minWidth: '800px',
        minHeight:'500px',
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.employeeService.updateEmployee(result).subscribe(_ => {
            this.initEmployees();
          });
        }
      });
    });
  }

  deleteEmployee(empToDelete: Employee) {
    this.employeeService.deleteEmployee(empToDelete.email).subscribe(_ => {
      this.initEmployees();
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
    this.employeeService.saveTeam(team).subscribe(_ => {
      this.initEmployees();
    });
  }

}
