import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DutyType } from 'src/app/model/duty';
import { DutyService } from 'src/app/service';
import { DutyTypeEventService } from 'src/app/service/event/duty-type-event.service';

@Component({
  selector: 'app-edit-duty-type-display-mode',
  templateUrl: './edit-duty-type-display-mode.component.html',
  styleUrl: './edit-duty-type-display-mode.component.css'
})
export class EditDutyTypeDisplayModeComponent {

  @Input() dutyType!: DutyType

  @Output() editEvent = new EventEmitter<{operation: string}>();

  form: FormGroup;  

  constructor(private fb: FormBuilder, private dutyTypeEventService: DutyTypeEventService, private dutyService: DutyService) {
    
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
    this.editEvent.emit({operation: 'TO_EDIT'});
  }


  deleteDutyType() {
    this.dutyService.deleteDutyType(this.dutyType?.type).subscribe(_ => {
      this.editEvent.emit({operation: 'DELETED'});
      this.dutyTypeEventService.sendMessageDutyTypeDeleted(this.dutyType);
    });
  }
}
