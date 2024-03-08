import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Team } from 'src/app/model/employee';
import { DutyService, EmployeeService } from 'src/app/service';
import { DutyTypeEventService } from 'src/app/service/event/duty-type-event.service';
import { EmployeeEventService } from 'src/app/service/event/employee-event.service';

@Component({
  selector: 'app-edit-team-edit-mode',
  templateUrl: './edit-team-edit-mode.component.html',
  styleUrl: './edit-team-edit-mode.component.css'
})
export class EditTeamEditModeComponent {

  @Input() team!: Team
  @Input() teamNames : Set<String> = new Set(); 
  @Output() editEvent = new EventEmitter<{operation: string}>();

  teamNamesShadow : Set<String> = new Set(); 
  form: FormGroup;  

  constructor(private fb: FormBuilder, private empService: EmployeeService, private empEventService: EmployeeEventService) {
    
    this.form = this.fb.group({
      teamName: [this.team?.teamName, [Validators.required]],
      parentTeamName: [this.team?.parentTeamName],
    });

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.team) {
      this.form.patchValue(this.team);
    }
    this.teamNamesShadow = new Set(this.teamNames);
    this.teamNamesShadow?.delete(this.team.teamName);
  }
  
  sendEditEvent() {
    this.editEvent.emit({operation: 'TO_DISPLAY'});
  }

  edit() {
    const teamName: string = this.form.controls['teamName'].value;
    const parentTeamName: string = this.form.controls['parentTeamName'].value;

    this.empService.updateTeam({teamName: teamName, parentTeamName: parentTeamName}, this.team.teamName).subscribe(_ => {
      this.empEventService.sendMessageEmployeeTeamEdited();
      this.editEvent.emit({operation: 'TO_DISPLAY'});
    });
  }

}
