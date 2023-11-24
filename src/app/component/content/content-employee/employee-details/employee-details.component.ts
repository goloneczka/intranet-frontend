import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/model/employee';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent {

  fullDataEmployee! : Employee

  constructor(@Inject(MAT_DIALOG_DATA) employee : Employee) {
    this.fullDataEmployee = employee;
  }
  
}
