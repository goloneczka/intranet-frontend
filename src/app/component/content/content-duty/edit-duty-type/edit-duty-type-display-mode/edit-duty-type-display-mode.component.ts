import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DutyType } from 'src/app/model/duty';

@Component({
  selector: 'app-edit-duty-type-display-mode',
  templateUrl: './edit-duty-type-display-mode.component.html',
  styleUrl: './edit-duty-type-display-mode.component.css'
})
export class EditDutyTypeDisplayModeComponent {

  @Input() dutyType!: DutyType

  @Output() editEvent = new EventEmitter<boolean>();

  form: FormGroup;  

  constructor(private fb: FormBuilder) {
    
    this.form = this.fb.group({
      type: [this.dutyType?.type, [Validators.required]],
      shortcut: [this.dutyType?.shortcut],
    });

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dutyType'] && changes['dutyType'].currentValue) {
      this.form.patchValue(this.dutyType);
    }
  }

  sendEditEvent() {
    this.editEvent.emit(true);
  }


  deletePost() {
    // this.deleteEvent.emit(this.card);
  }
  
}
