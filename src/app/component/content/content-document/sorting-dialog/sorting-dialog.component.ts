import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocumentGroup } from 'src/app/model/document';
import {cloneDeep} from 'lodash';

@Component({
  selector: 'app-sorting-dialog',
  templateUrl: './sorting-dialog.component.html',
  styleUrls: ['./sorting-dialog.component.css']
})
export class SortingDialogComponent {

  groupsDataShadow: DocumentGroup[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public groupsData: DocumentGroup[]) {
    this.groupsDataShadow = cloneDeep(this.groupsData);
  };

  setOrder(direction : string, order: number) {
    const temp = this.groupsDataShadow[order-1];
    if(direction === 'DOWN' && this.groupsDataShadow.length-1 !== order) {
      this.groupsDataShadow[order-1] = this.groupsDataShadow[order];
      this.groupsDataShadow[order-1].order--;
      this.groupsDataShadow[order] = temp;
      this.groupsDataShadow[order].order++;
    } else if(direction === 'UP' && order !== 1){
      this.groupsDataShadow[order-1] = this.groupsDataShadow[order-2];
      this.groupsDataShadow[order-1].order++;
      this.groupsDataShadow[order-2] = temp;
      this.groupsDataShadow[order-2].order--;
    }
  }
}
