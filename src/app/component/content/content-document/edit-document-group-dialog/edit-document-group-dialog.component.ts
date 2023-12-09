import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { cloneDeep } from 'lodash';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
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

  constructor(@Inject(MAT_DIALOG_DATA) private dataToEditGroup: any, private fb: FormBuilder) {

    const groupDataShadow = {...this.dataToEditGroup.groupToEdit};
    this.result = groupDataShadow;

    const docTypes : DocumentGroup[] = cloneDeep(this.dataToEditGroup.docTypes);
    this.docTypesShadow = docTypes.map(it => {
      it.order += it.order <= groupDataShadow.order ? 1 : 0;
      return it;
    }).filter(it => it.topic !== groupDataShadow.topic);

    this.docTypesShadow.pop();
    this.docTypesShadow.unshift({'topic': 'Jako Pierwsza', 'order': 1 });

    this.documentGroupForm = this.fb.group({
      newTopicName: [groupDataShadow.topic, [Validators.required]],
      topicBeforeThis: [this.docTypesShadow.find(it => it.order === groupDataShadow.order)!.topic, [Validators.required]]
    });
    
  };


  ngOnInit(): void {
    this.documentGroupForm.valueChanges
      .pipe(debounceTime(200))
      .subscribe(val => {
          this.updateResult(val);
      });
  }

  updateResult(form: {newTopicName : string, topicBeforeThis: string}) {
    const order = this.docTypesShadow.find(it => it.topic === form.topicBeforeThis)!.order;
    this.result = {'topic': form.newTopicName, 'order': order};
  }

}
