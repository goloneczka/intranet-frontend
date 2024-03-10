import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-employee-migration',
  templateUrl: './employee-migration.component.html',
  styleUrl: './employee-migration.component.css'
})
export class EmployeeMigrationComponent {

  @Input() teamArrayInput: Set<String> = new Set();

  teamArrayInputShadow: Set<String> = new Set();

  employees : {employee: Employee, touched: boolean}[] = [];
  shouldComponentBeRender: boolean = false;
  form: FormGroup; 

  @Output() migrationDoneEvent = new EventEmitter<void>;

  constructor(private employeeService: EmployeeService, private fb: FormBuilder){
    this.form = this.fb.group({
      from: ['', [Validators.required]],
      to: ['',[Validators.required]],
    });
  }
  
  shouldDisplayForm(val: boolean) {
    this.shouldComponentBeRender = val;
    if(val){
      this.teamArrayInputShadow = new Set();
      this.form.reset();
      this.employees = [];
    }
  }

  onSelectionFromChange(event: MatSelectChange){
    this.employeeService.getEmployeesByTeam(event.value).subscribe(data => {
      this.employees = data.map(it => {return {employee: it, touched: false}})
    });
    this.teamArrayInputShadow = new Set(this.teamArrayInput);
    this.teamArrayInputShadow.delete(event.value);
  }

  onClickEmployee(index : number) {
    this.employees[index].touched = !this.employees[index].touched;
  }

  update(){
    const from: string = this.form.controls['from'].value;
    const to: string = this.form.controls['to'].value;
    const employeesToMigrate = this.employees
    .filter(it => it.touched)
    .map(it => ({email: it.employee.email}));

    this.employeeService.migrateEmployees(from, to, employeesToMigrate).subscribe(_ => {
      this.migrationDoneEvent.emit();
      this.shouldDisplayForm(false);
    });
  }
}
