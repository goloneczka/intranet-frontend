import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DutyType } from 'src/app/model/duty';

@Component({
  selector: 'app-new-duty-type',
  templateUrl: './new-duty-type.component.html',
  styleUrl: './new-duty-type.component.css'
})
export class NewDutyTypeComponent {

  shouldComponentBeRender: boolean = false;
  dutyTypeForm: FormGroup;

  @Output() newDutyTypeEvent = new EventEmitter<DutyType>();


  constructor(private fb: FormBuilder) {
    this.dutyTypeForm = this.fb.group({
      name: ['', [Validators.required]],
      shortcut: ['']
    });
  }

  shouldDisplayForm(val: boolean) {
    this.shouldComponentBeRender = val;
  }

  addDutyType() {
    const controlsForm = this.dutyTypeForm.controls;
    this.newDutyTypeEvent.emit({'type': controlsForm['name'].value,
                            'shortcut': controlsForm['shortcut'].value
    });
    this.shouldComponentBeRender = false;
    this.dutyTypeForm.reset();
  }

}
