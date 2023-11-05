import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { cloneDeep } from 'lodash';
import { DocumentGroup } from 'src/app/model/document';

@Component({
  selector: 'app-edit-document-group-dialog',
  templateUrl: './edit-document-group-dialog.component.html',
  styleUrls: ['./edit-document-group-dialog.component.css']
})
export class EditDocumentGroupDialogComponent {

  documentGroupForm: FormGroup;
  result: DocumentGroup;
  docTypesShadow: DocumentGroup[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) private dataToEditGroup: any,
   private fb: FormBuilder) {

    const groupDataShadow = {...this.dataToEditGroup.groupToEdit};
    this.result = groupDataShadow;

    const docTypes : DocumentGroup[] = cloneDeep(this.dataToEditGroup.docTypes);
    this.docTypesShadow = docTypes.map(it => {
      if(it.order <= groupDataShadow.order){
        it.order++
      }
      return it;
    }).filter(it => (it.topic !== groupDataShadow.topic));
    this.docTypesShadow.pop();
    this.docTypesShadow.unshift({'topic': 'Jako Pierwsza', 'order': 1 });


    this.documentGroupForm = this.fb.group({
      topic: [groupDataShadow.topic, [Validators.required]],
      order: [this.docTypesShadow.find(it => it.order === groupDataShadow.order)!.topic, [Validators.required]]
    });
  };

  update(topicOrderString: string) {
    const order = this.docTypesShadow.find(it => it.topic === topicOrderString)!.order;
    this.result = {'topic': this.documentGroupForm.value.topic, 'order': order};
  }
}
