import {Component, ViewChild} from '@angular/core';
import {Observable, of} from "rxjs";
import {DocumentService} from "../../../service/document.service";
import {Document, DocumentGroup} from "../../../model/document";
import {LocalStorageService} from "./../../../service/local-storage.service";
import { NewDocumentGroupComponent } from './new-document-group/new-document-group.component';
import { MatDialog } from '@angular/material/dialog';
import { SortingDocumentComponent } from './sorting-document/sorting-document.component';
import { EditDocumentGroupDialogComponent } from './edit-document-group-dialog/edit-document-group-dialog.component';
import { NewDocumentDialogComponent } from './new-document-dialog/new-document-dialog.component';
import { EditDocumentDialogComponent } from './edit-document-dialog/edit-document-dialog.component';
import { AuthenticationService } from 'src/app/service';

@Component({
  selector: 'app-content-document',
  templateUrl: './content-document.component.html',
  styleUrls: ['./content-document.component.css']
})
export class ContentDocumentComponent {

  @ViewChild(NewDocumentGroupComponent)
  documentGroupChild!: NewDocumentGroupComponent;

  @ViewChild(SortingDocumentComponent)
  sortingDocumentComponent!: SortingDocumentComponent;

  documents$: Observable<Document[]> = of([]);
  docTypes: DocumentGroup[] = [];
  isUserAuthenticated: boolean;

  
  constructor(private documentService: DocumentService, public dialog: MatDialog, private authService: AuthenticationService) {
    this.isUserAuthenticated = this.authService.hasAdminRole();
  }

  ngOnInit(): void {
    this.documents$ = this.documentService.getDocuments();
    this.initDocumentGroups();
  }

  getDocumentData(fileName: string) {
    this.documentService.getDocumentData(fileName).subscribe(data => {
        const blob = new Blob([data], { type: 'application/pdf' });
        window.open(URL.createObjectURL(blob), '_blank');
      });
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
    this.documentService.deleteDocumentType(groupToDelete.topic).subscribe(_ => {
      this.initDocumentGroups();
    });
  }

  reRender() {
    this.documents$ = this.documentService.getDocuments();
    this.initDocumentGroups();
  }

  private initDocumentGroups(){
    this.documentService.getDocumentTypes().subscribe(docTypes => {
      docTypes.push({'topic': '', 'order': docTypes.length+1 });
      this.docTypes = docTypes;
    });
  }

  openDialogSorting() {
    this.sortingDocumentComponent.shouldDisplayForm(true);
  }

  openDialogEdit(groupToEdit: DocumentGroup) {
    const dialogRef = this.dialog.open(EditDocumentGroupDialogComponent,
       {data: {'groupToEdit': groupToEdit, 'docTypes': this.docTypes}, minWidth: '500px', minHeight:'200px', disableClose: true}
    );

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.documentService.updateDocumentType(result, groupToEdit.topic).subscribe(_ => {
          this.initDocumentGroups();
          this.documents$ = this.documentService.getDocuments();
        });
      }
    });
  }

  openDialogEditDoc(doc: Document, event: Event) {
    event.stopPropagation();

    const dialogRef = this.dialog.open(EditDocumentDialogComponent, {
      data: {document: doc, documentGroups: this.docTypes},
      minWidth: '700px',
      minHeight:'300px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.documents$ = this.documentService.getDocuments();
      }
    });
  }

  deleteDoc(doc: Document, event: Event) {
    event.stopPropagation();
    this.documentService.deleteDocument(doc.fileName).subscribe(_ => {
      this.documents$ = this.documentService.getDocuments();
    });
  }

  addDocument(docGrupe : string) {
    const dialogRef = this.dialog.open(NewDocumentDialogComponent,
      {data: docGrupe, minWidth: '700px', minHeight:'200px', disableClose: true}
   );

   dialogRef.afterClosed().subscribe(result => {
    if(result){
      const documentName = result.controls['document'].value;
      const file = result.controls['file'].value;
      const comment = result.controls['comment'].value;
      this.documentService.saveDocument({
        'topic': docGrupe, 'data': file, 'comment': comment, 'fileName': documentName
      }).subscribe(_ => {
        this.documents$ = this.documentService.getDocuments();
      })
    }
  });
  }
}
