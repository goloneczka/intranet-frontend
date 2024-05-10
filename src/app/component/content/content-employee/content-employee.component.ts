import {Component, OnInit, ViewChild} from '@angular/core';
import {EmployeeService} from "../../../service/employee.service";
import {Employee, Team, TeamTree} from "../../../model/employee";
import { MatDialog } from '@angular/material/dialog';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { NewEmployeeComponent } from './new-employee/new-employee.component';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription, debounceTime, pairwise, startWith } from 'rxjs';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { NewEmployeeTeamComponent } from './new-employee-team/new-employee-team.component';
import { EditEmployeeTeamDialogComponent } from './edit-employee-team-dialog/edit-employee-team-dialog.component';
import { EditTeamComponent } from './edit-team/edit-team.component';
import { EmployeeEventService } from 'src/app/service/event/employee-event.service';
import { EmployeeMigrationComponent } from './employee-migration/employee-migration.component';
import { AuthenticationService } from 'src/app/service';


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
  @ViewChild(EditTeamComponent)
  editTeamComponent!: EditTeamComponent;
  @ViewChild(EmployeeMigrationComponent)
  employeeMigrationComponent!:EmployeeMigrationComponent

  employees : Employee[] = [];
  filteredEmployees : Employee[] = [];
  teamNames : Set<String> = new Set();
  teamTree! : TeamTree;
  teamNamesToFilter : string[] = []; 
  filterForm: FormGroup;
  isUserAuthenticated: boolean;
  loading : boolean = false;
  empEventSubscription!: Subscription;

  constructor(private employeeService: EmployeeService,
      public dialog: MatDialog,
      private fb: FormBuilder,
      private empEventService: EmployeeEventService,
      private authService: AuthenticationService) {
    this.isUserAuthenticated = this.authService.hasAdminRole();
    this.filterForm = this.fb.group({
      name: [''],
      teamName: ['']
    });

  }

  ngOnInit(): void {
    this.initEmployeesAndTeams();

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

    this.empEventSubscription = this.empEventService.getMessage().subscribe((_ : {operation: string}| null) => {
      this.initEmployeesAndTeams();
      this.filterForm.controls['name'].setValue('');
      this.filterForm.controls['teamName'].setValue('');
    });
  }

  private initEmployeesAndTeams() {
    this.loading = true;
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
      this.filterData(this.filterForm.value);
      this.initTeamsPromise().then(_ => this.loading = false);
    });
  }

  private initTeamsPromise() {
    return new Promise<void>(resolve => {
      this.employeeService.getTeamsTree().subscribe(data => {
        this.teamTree = data;

        const tempTeamNames = this.employeeService.gesNestedTeamsInTree('', this.teamTree).sort();
        tempTeamNames.shift();
        this.teamNames = new Set(tempTeamNames);
        resolve();
      });
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
        minHeight:'400px',
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.employeeService.updateEmployee(result).subscribe(_ => {
            this.initEmployeesAndTeams();
          });
        }
      });
    });
  }

  deleteEmployee(empToDelete: Employee) {
    this.employeeService.deleteEmployee(empToDelete.email).subscribe(_ => {
      this.initEmployeesAndTeams();
      this.filterForm.reset();
      this.empEventService.sendMessageEmployeeDelete();
    })
  }

  addEmployee() {
    this.initTeamsPromise().then(_ => this.newEmployeeChild.shouldDisplayForm(true));
  }

  saveEmployee(emp : Employee) {
    this.employeeService.saveEmployee(emp).subscribe(_ => {
      this.initEmployeesAndTeams();
    });
  }

  addTeam() {
    this.initTeamsPromise().then(_ => this.newEmployeeTeamChild.shouldDisplayForm(true));
  }

  editTeam() {
    this.editTeamComponent.shouldDisplayForm(true);
  }

  saveTeam(team : Team) { 
    this.employeeService.saveTeam(team).subscribe(_ => {
      this.initTeamsPromise();
    });
  }

  openMigration() {
    this.initTeamsPromise().then(_ => this.employeeMigrationComponent.shouldDisplayForm(true));
  }

  ngOnDestroy() {
    this.empEventSubscription?.unsubscribe();
  }

  onMigrationDoneEvent() {
    this.initEmployeesAndTeams();
  }


}
