import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { DocumentGroup } from 'src/app/model/document';
import { Employee } from 'src/app/model/employee';

@Component({
  selector: 'app-edit-employee-team-dialog',
  templateUrl: './edit-employee-team-dialog.component.html',
  styleUrls: ['./edit-employee-team-dialog.component.css']
})
export class EditEmployeeTeamDialogComponent {

  employeeGroupForm: FormGroup;
  result: Employee;

  employeeShadow: Employee;
  teamNamesShadow: Set<String> = new Set();
  
  constructor(@Inject(MAT_DIALOG_DATA) private dataToEditEmployeeTeam: any, private fb: FormBuilder) {

    this.result = this.employeeShadow = {...dataToEditEmployeeTeam.emp};

    const teamArray = [...this.dataToEditEmployeeTeam.teamNames];
    teamArray.splice(0, 1);
    this.teamNamesShadow = new Set(teamArray);

    this.employeeGroupForm = this.fb.group({
      firstName: [this.employeeShadow.firstName, [Validators.required]],
      lastName: [this.employeeShadow.lastName, [Validators.required]],
      email: [this.employeeShadow.email, [Validators.required, Validators.email]],
      phoneNumber: [this.employeeShadow.phoneNumber],
      title: [this.employeeShadow.title, [Validators.required]],
      major: [this.employeeShadow.major, [Validators.required]],
      birthDate: [this.employeeShadow.birthDate],
      hireDate: [this.employeeShadow.hireDate],
      teamName: [this.employeeShadow.teamName, [Validators.required]]
   });
  }

  ngOnInit(): void {
    this.employeeGroupForm.valueChanges
      .pipe(debounceTime(200))
      .subscribe(val => {
          this.updateResult(val);
      });
  }

  updateResult(form: {firstName : string, lastName: string, email : string, phoneNumber: string, title : string, major: boolean, birthDate : Date, hireDate: Date, teamName : string}) {
    this.result = {
      'firstName': form.firstName,
      'lastName': form.lastName,
      'email': form.email,
      'phoneNumber': form.phoneNumber,
      'title': form.title,
      'major': form.major,
      'birthDate': form.birthDate,
      'hireDate': form.hireDate,
      'teamName': form.teamName,
    };
  }

}
