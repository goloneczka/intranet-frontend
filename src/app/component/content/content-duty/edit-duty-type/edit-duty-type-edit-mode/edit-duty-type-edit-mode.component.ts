import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DutyType } from 'src/app/model/duty';
import { DutyService } from 'src/app/service';
import { DutyTypeEventService } from 'src/app/service/duty-type-event.service';

@Component({
  selector: 'app-edit-duty-type-edit-mode',
  templateUrl: './edit-duty-type-edit-mode.component.html',
  styleUrl: './edit-duty-type-edit-mode.component.css'
})
export class EditDutyTypeEditModeComponent {

  @Input() dutyType!: DutyType

  @Output() editEvent = new EventEmitter<{operation: string}>();

  form: FormGroup;  

  constructor(private fb: FormBuilder, private dutyService: DutyService, private dutyTypeEventService: DutyTypeEventService) {
    
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
    this.editEvent.emit({operation: 'TO_DISPLAY'});
  }

  editDutyType() {
    const type: string = this.form.controls['type'].value;
    const shortcut: string = this.form.controls['shortcut'].value;

    this.dutyService.editDutyType({type: type, shortcut: shortcut}, this.dutyType.type).subscribe(_ => {
      this.editEvent.emit({operation: 'TO_DISPLAY'});
      this.dutyTypeEventService.sendMessageDutyTypeEdited(this.dutyType);
    });
  }
  
}
