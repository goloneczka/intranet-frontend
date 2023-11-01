import {Component, ViewChild} from '@angular/core';
import {Observable, of} from "rxjs";
import {DocumentService} from "../../../service/document.service";
import {Document, DocumentGroup} from "../../../model/document";
import {LocalStorageService} from "./../../../service/local-storage.service";
import { NewDocumentGroupComponent } from './new-document-group/new-document-group.component';
import { MatDialog } from '@angular/material/dialog';
import { SortingDialogComponent } from './sorting-dialog/sorting-dialog.component';

@Component({
  selector: 'app-content-document',
  templateUrl: './content-document.component.html',
  styleUrls: ['./content-document.component.css']
})
export class ContentDocumentComponent {

  @ViewChild(NewDocumentGroupComponent)
  documentGroupChild!: NewDocumentGroupComponent;

  documents$: Observable<Document[]> = of([]);
  docTypes: DocumentGroup[] = [];

  isUserAuthenticated: boolean = LocalStorageService.isAuthenticated();
  
  constructor(private documentService: DocumentService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.documents$ = this.documentService.getDocuments();
    this.documentService.getDocumentTypes().subscribe(docTypes => {
      docTypes.push({'topic': '', 'order': docTypes.length+1 });
      this.docTypes = docTypes;
    });
  }

  getDocumentData(fileName: string) {
    this.documentService.getDocumentData(fileName).subscribe(data => {
        const blob = new Blob([data], { type: 'application/pdf' });
        window.open(URL.createObjectURL(blob), '_blank');
      })
  }

  addGroup() {
    this.documentGroupChild.shouldDisplayForm(true);
  }

  addDocumentGroup(newGroup: any ){
    // this.documentService.saveDocumentType(val.group).subscribe(_ => {
      this.docTypes.forEach(it => it.order >= newGroup.order ? it.order++ : it);
      this.docTypes.splice(newGroup.order-1, 0, {'topic': newGroup.topic, 'order': newGroup.order });
      console.log(this.docTypes);
    // });
  }

  openDialogBox() {
    const dialogRef = this.dialog.open(SortingDialogComponent,
       {data: this.docTypes, minWidth: '400px', disableClose: true}
    );

    dialogRef.afterClosed().subscribe(result => {
      if(result?.length){
        this.documentService.saveDocumentOrderTypes(this.docTypes).subscribe(_ => {
          this.docTypes = result;
        });
      }
    });
  }
}
