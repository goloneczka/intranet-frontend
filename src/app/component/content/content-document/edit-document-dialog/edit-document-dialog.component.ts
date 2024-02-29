import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DocumentService } from 'src/app/service/document.service';
import {Document, DocumentGroup, DocumentToSave} from "../../../../model/document";


@Component({
  selector: 'app-edit-document-dialog',
  templateUrl: './edit-document-dialog.component.html',
  styleUrl: './edit-document-dialog.component.css'
})
export class EditDocumentDialogComponent {

  currentFileName: string = '';
  inputFileName: string = '';
  documentForm: FormGroup;
  documentShadow: DocumentToSave;
  documentGroupsShadow: DocumentGroup[] = [];
  
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
   private fb: FormBuilder,
   public dialogRef: MatDialogRef<EditDocumentDialogComponent>,
   private documentService: DocumentService
  ) {
    this.documentShadow = {...data.document};
    this.currentFileName = this.inputFileName = this.documentShadow.fileName;

    this.documentForm = this.fb.group({
        fileName: [this.documentShadow.fileName, [Validators.required]],
        comment: [this.documentShadow.comment],
        data: [null],
        topic: [this.documentShadow.topic]
      });

      this.documentGroupsShadow = [...data.documentGroups];
  }

  onFileSelected(event: any): void {
    const fileInput = event.target.files[0] ?? null;
    this.inputFileName = fileInput.name;

    this.documentForm.controls['data'].setValue(fileInput);    
    if(!this.documentForm.controls['fileName'].value){
      this.documentForm.controls['fileName'].setValue(this.inputFileName);
    }
  }


  editDocument(){
    const fileName: string = this.documentForm.controls['fileName'].value;
    const comment: string = this.documentForm.controls['comment'].value;
    const topic: string = this.documentForm.controls['topic'].value;

    const data: any = this.documentForm.controls['data'].value;
    if (data) {
      this.editDoc(fileName, comment, topic, data);
    } else {
      this.documentService.getDocumentData(fileName).subscribe(currData => {
        this.editDoc(fileName, comment, topic, currData);
      });
    }
  };

  private editDoc(fileName: string, comment: string, topic: string, data: any) {
    this.documentService.edit({fileName: fileName, comment: comment, data: data, topic: topic}, this.currentFileName).subscribe(_ => {
      this.dialogRef.close(true);
    });
  }
  
}
