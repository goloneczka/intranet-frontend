import { Component, Input } from '@angular/core';
import { DutyType } from 'src/app/model/duty';

@Component({
  selector: 'app-edit-duty-type',
  templateUrl: './edit-duty-type.component.html',
  styleUrl: './edit-duty-type.component.css'
})
export class EditDutyTypeComponent {

  shouldComponentBeRender : boolean = false;

  idOfPostsToEdit : number[] = [];

  @Input()
  dutyTypes: DutyType[] = [];


  shouldDisplayForm(val : boolean) {
    this.shouldComponentBeRender = val; 
  }

  displayOrEditView(event: {operation: string}, ind: number) {
    if(event.operation === 'TO_EDIT'){
      this.idOfPostsToEdit.push(ind);
    } else if(event.operation === 'TO_DISPLAY') {
      this.idOfPostsToEdit = this.idOfPostsToEdit.filter(v => v != ind);
    } else if(event.operation === 'DELETED') {
      this.idOfPostsToEdit = this.idOfPostsToEdit.map(v => ind > v ? ind-1 : ind );
    }
  }

}
