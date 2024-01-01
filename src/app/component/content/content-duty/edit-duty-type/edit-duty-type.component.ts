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

  displayOrEditView(isAdd: boolean, ind: number) {
    if(isAdd){
      this.idOfPostsToEdit.push(ind);
    } else {
      this.idOfPostsToEdit = this.idOfPostsToEdit.filter(v => v != ind);
    }
  }

}
