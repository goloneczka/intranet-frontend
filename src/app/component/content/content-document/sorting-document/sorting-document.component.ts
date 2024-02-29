import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DocumentGroup } from 'src/app/model/document';
import { DocumentService } from 'src/app/service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { OrderingContact } from 'src/app/model/contact';

@Component({
  selector: 'app-sorting-document',
  templateUrl: './sorting-document.component.html',
  styleUrls: ['./sorting-document.component.css']
})
export class SortingDocumentComponent {

  @Input()
  groupsData : DocumentGroup[] = [];
  @Output()
  groupsChanged = new EventEmitter<void>();

  groupsDataShadow: DocumentGroup[] = [];
  shouldComponentBeRender = false;

  constructor(private docService: DocumentService) {}
  
  ngOnChanges(): void {
    this.groupsDataShadow = [...this.groupsData];
    this.groupsDataShadow.pop();
  }

  shouldDisplayForm(val : boolean) {
    if(val) {
        this.groupsDataShadow = [...this.groupsData];
        this.groupsDataShadow.pop();
    }
    this.shouldComponentBeRender = val;
  }

  onDrop(event: CdkDragDrop<OrderingContact[]>) {
    moveItemInArray(this.groupsDataShadow, event.previousIndex, event.currentIndex);
  }

  saveGroup() {
    const groupsToUpdate :DocumentGroup[] = this.groupsDataShadow.map((it, ind) => {
        if(it.order === ind+1) {
          return null!;
        }
        it.order = ind +1;
        return it;
    }).filter(it => it !== null);

    if(groupsToUpdate.length){
      this.docService.saveDocumentOrderTypes(groupsToUpdate).subscribe(_ => {
        this.groupsChanged.emit();
        this.shouldDisplayForm(false);
      });    
    }
  }
}
