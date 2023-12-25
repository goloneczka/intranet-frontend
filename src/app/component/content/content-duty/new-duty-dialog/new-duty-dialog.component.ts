import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { debounceTime } from 'rxjs';
import { DutyToSave } from 'src/app/model/duty';

@Component({
  selector: 'app-new-duty-dialog',
  templateUrl: './new-duty-dialog.component.html',
  styleUrls: ['./new-duty-dialog.component.css']
})
export class NewDutyDialogComponent {

  dutyGroupForm: FormGroup;
  result: DutyToSave;

  dutyShadow: DutyToSave;
  
  constructor(@Inject(MAT_DIALOG_DATA) private newDutyFieldsToCreate: any, private fb: FormBuilder) {

    this.result = this.dutyShadow = {...newDutyFieldsToCreate};
    console.log(newDutyFieldsToCreate);

    this.dutyGroupForm = this.fb.group({
      dutyDay: [this.dutyShadow.dutyDay, [Validators.required]],
      dutyType: [this.dutyShadow.dutyType, [Validators.required]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      employeeMail: ['', [Validators.required, Validators.email]],
   });
  }

  ngOnInit(): void {
    this.dutyGroupForm.valueChanges
      .pipe(debounceTime(200))
      .subscribe(val => {
          this.updateResult(val);
      });
  }

  updateResult(form: {dutyDay : Date, startTime: string, employeeMail : string, endTime: string, dutyType : string}) {
    this.result = {
      'dutyDay': form.dutyDay,
      'startTime': form.startTime,
      'endTime': form.endTime,
      'employeeMail': form.employeeMail,
      'dutyType': form.dutyType
    };
  }

}
