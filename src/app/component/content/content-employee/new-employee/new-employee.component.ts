import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { th } from 'date-fns/locale';
import { Employee } from 'src/app/model/employee';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})
export class NewEmployeeComponent implements OnChanges {

  shouldComponentBeRender : boolean = false;
  employeeGroupForm: FormGroup;

  @Input() teamArrayInput: Set<String> = new Set();
  teamArrayShadow: Set<String> = new Set();

  @Output() newEmployeeEvent = new EventEmitter<Employee>();

  constructor(private fb: FormBuilder) {
    this.employeeGroupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      title: ['', [Validators.required]],
      major: [false, [Validators.required]],
      birthDate: [''],
      hireDate: [''],
      teamName: ['', [Validators.required]]
    });
  }

  ngOnChanges(_: SimpleChanges): void {
    const teamArray = [...this.teamArrayInput];
    this.teamArrayShadow = new Set(teamArray);
  }

  shouldDisplayForm(val: boolean) {
    this.shouldComponentBeRender = val;
  }

  addEmployee() {
    if(this.employeeGroupForm.valid){
      const controlsForm = this.employeeGroupForm.controls;
      this.newEmployeeEvent.emit({'firstName': controlsForm['firstName'].value,
                                  'lastName': controlsForm['lastName'].value,
                                  'email': controlsForm['email'].value,
                                  'phoneNumber': controlsForm['phoneNumber'].value,
                                  'title': controlsForm['title'].value,
                                  'major': controlsForm['major'].value,
                                  'birthDate': controlsForm['birthDate'].value,
                                  'hireDate': controlsForm['hireDate'].value,
                                  'teamName': controlsForm['teamName'].value
      });
      this.shouldComponentBeRender = false;
      this.employeeGroupForm.reset();
    }
  }

}
