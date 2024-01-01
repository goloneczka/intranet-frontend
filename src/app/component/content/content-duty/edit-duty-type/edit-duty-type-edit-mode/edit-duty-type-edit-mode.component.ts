import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DutyType } from 'src/app/model/duty';

@Component({
  selector: 'app-edit-duty-type-edit-mode',
  templateUrl: './edit-duty-type-edit-mode.component.html',
  styleUrl: './edit-duty-type-edit-mode.component.css'
})
export class EditDutyTypeEditModeComponent {

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
    this.editEvent.emit(false);
  }


  deletePost() {
    // this.deleteEvent.emit(this.card);
  }
  

  editDutyType() {
    if(this.form.valid){
      // const title: string = this.postForm.controls['title'].value;
      // const message: string = this.postForm.controls['message'].value;
      // this.editPostEvent.emit({'title': title, 'message': message});
      // this.editEvent.emit(false);
    }
  }
}
