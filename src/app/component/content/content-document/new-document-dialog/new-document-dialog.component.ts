import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-document-dialog',
  templateUrl: './new-document-dialog.component.html',
  styleUrls: ['./new-document-dialog.component.css']
})
export class NewDocumentDialogComponent {

  documentForm: FormGroup;
  inputFileName: string = '';
  groupName: string = '';
  result: any = {};

  constructor(@Inject(MAT_DIALOG_DATA) private dataGroupName: string,
   private fb: FormBuilder) {
    this.groupName = dataGroupName;

    this.documentForm = this.fb.group({
      document: ['', [Validators.required]],
      file: [null, [Validators.required]],
      comment: ['']
    });
  }

  onFileSelected(event: any): void {
    const fileInput = event.target.files[0] ?? null;
    this.inputFileName = fileInput.name;
    this.documentForm.controls['file'].setValue(fileInput);
    
    if(!this.documentForm.controls['document'].dirty){
      this.documentForm.controls['document'].setValue(this.inputFileName);
    }
  }

  addGroup() {

  }

}
