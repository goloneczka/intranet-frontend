import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Team } from 'src/app/model/employee';
import { DutyService, EmployeeService } from 'src/app/service';
import { DutyTypeEventService } from 'src/app/service/event/duty-type-event.service';
import { EmployeeEventService } from 'src/app/service/event/employee-event.service';

@Component({
  selector: 'app-edit-team-display-mode',
  templateUrl: './edit-team-display-mode.component.html',
  styleUrl: './edit-team-display-mode.component.css'
})
export class EditTeamDisplayModeComponent {

  @Input() team!: Team

  @Output() editEvent = new EventEmitter<{operation: string}>();

  form: FormGroup;  

  constructor(private fb: FormBuilder, private empService: EmployeeService, private empEventService: EmployeeEventService) {
    
    this.form = this.fb.group({
      teamName: [this.team?.teamName, [Validators.required]],
      parentTeamName: [this.team?.parentTeamName],
    });

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['team'] && changes['team'].currentValue) {
      this.form.patchValue(this.team);
    }
  }

  sendEditEvent() {
    this.editEvent.emit({operation: 'TO_EDIT'});
  }


  delete() {
    this.empService.deleteTeam(this.team?.teamName).subscribe(_ => {
      this.empEventService.sendMessageEmployeeTeamDelete();
      this.editEvent.emit({operation: 'DELETED'});
    });
  }

}
