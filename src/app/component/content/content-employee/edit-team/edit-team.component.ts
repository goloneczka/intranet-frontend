import { Component, Input, SimpleChanges } from '@angular/core';
import * as _ from 'lodash';
import { Team, TeamTree } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/service';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrl: './edit-team.component.css'
})
export class EditTeamComponent {


  shouldComponentBeRender : boolean = false;
  idsToEdit : number[] = [];
  @Input()
  teamTreeInput! : TeamTree
  teams : Team[] = [];
  teamNames : Set<String> = new Set();

  constructor(private employeeService: EmployeeService){}
  

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['teamTreeInput'] && JSON.stringify(changes['teamTreeInput'].previousValue) != JSON.stringify(changes['teamTreeInput'].currentValue)) {
      const teamNames : string[] = this.employeeService.gesNestedTeamsInTree('', this.teamTreeInput);
      this.teamNames = new Set(teamNames);
      
      teamNames.shift();
      this.teams = teamNames.map(it => {return {parentTeamName: this.employeeService.gesTeamParentInTree(it, this.teamTreeInput), teamName: it}});
    }
  }

  shouldDisplayForm(val : boolean) {
    this.shouldComponentBeRender = val; 
  }

  displayOrEditView(event: {operation: string}, ind: number) {
    if(event.operation === 'TO_EDIT'){
      this.idsToEdit.push(ind);
    } else if(event.operation === 'TO_DISPLAY') {
      this.idsToEdit = this.idsToEdit.filter(v => v != ind);
    } else if(event.operation === 'DELETED') {
      this.idsToEdit = this.idsToEdit.map(v => ind > v ? ind-1 : ind );
    }
  }

}
