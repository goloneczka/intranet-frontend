import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Team } from 'src/app/model/employee';

@Component({
  selector: 'app-new-employee-team',
  templateUrl: './new-employee-team.component.html',
  styleUrls: ['./new-employee-team.component.css']
})
export class NewEmployeeTeamComponent {

  shouldComponentBeRender: boolean = false;
  @Input() teamArrayInput: Set<String> = new Set();
  teamGroupForm: FormGroup;

  @Output() newTeamEvent = new EventEmitter<Team>();


  constructor(private fb: FormBuilder) {
    this.teamGroupForm = this.fb.group({
      name: ['', [Validators.required]],
      parentTeam: ['']
    });
  }

  shouldDisplayForm(val: boolean) {
    this.shouldComponentBeRender = val;
  }

  addTeam() {
    const controlsForm = this.teamGroupForm.controls;
    this.newTeamEvent.emit({'teamName': controlsForm['name'].value,
                            'parentTeamName': controlsForm['parentTeam'].value
    });
    this.shouldComponentBeRender = false;
    this.teamGroupForm.reset();
  }

}
