import {Component, ViewChild} from '@angular/core';
import {Observable, of} from "rxjs";
import {DocumentService} from "../../../service/document.service";
import {Document, DocumentGroup} from "../../../model/document";
import {LocalStorageService} from "./../../../service/local-storage.service";
import { NewDocumentGroupComponent } from './new-document-group/new-document-group.component';
import { MatDialog } from '@angular/material/dialog';
import { SortingDialogComponent } from './sorting-dialog/sorting-dialog.component';
import { EditDocumentGroupDialogComponent } from './edit-document-group-dialog/edit-document-group-dialog.component';

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
    this.initDocumentGroups();
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

  addDocumentGroup(newGroup: DocumentGroup){
    this.documentService.saveDocumentType(newGroup).subscribe(_ => {
      this.initDocumentGroups();
    });
  }

  deleteGroup(groupToDelete: DocumentGroup) {
    console.log(groupToDelete);
    this.documentService.deleteDocumentType(groupToDelete.topic).subscribe(_ => {
      this.initDocumentGroups();
    });

  }

  private initDocumentGroups(){
    this.documentService.getDocumentTypes().subscribe(docTypes => {
      docTypes.push({'topic': '', 'order': docTypes.length+1 });
      this.docTypes = docTypes;
    });
  }

  openDialogSorting() {
    const dialogRef = this.dialog.open(SortingDialogComponent,
       {data: this.docTypes, minWidth: '500px', minHeight:'200px', disableClose: true}
    );

    dialogRef.afterClosed().subscribe(result => {
      if(result?.length){
        this.documentService.saveDocumentOrderTypes(result).subscribe(_ => {
          this.initDocumentGroups();
        });
      }
    });
  }

  openDialogEdit(groupToEdit: DocumentGroup) {
    const dialogRef = this.dialog.open(EditDocumentGroupDialogComponent,
       {data: {'groupToEdit': groupToEdit, 'docTypes': this.docTypes}, minWidth: '500px', minHeight:'200px', disableClose: true}
    );

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log(result);
        this.documentService.updateDocumentType(result, groupToEdit.topic).subscribe(_ => {
          this.initDocumentGroups();
        });
      }
    });
  }
}
