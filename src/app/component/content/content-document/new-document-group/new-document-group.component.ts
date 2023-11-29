import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DocumentGroup } from 'src/app/model/document';
import {cloneDeep} from 'lodash';

@Component({
  selector: 'app-new-document-group',
  templateUrl: './new-document-group.component.html',
  styleUrls: ['./new-document-group.component.css']
})
export class NewDocumentGroupComponent implements OnChanges {
  
  @Output() newDocumentGroupEvent = new EventEmitter<DocumentGroup>();
  documentGroupForm: FormGroup;
  shouldComponentBeRender = false;
  @Input() docTypes: DocumentGroup[] = [];
  docTypesShadow: DocumentGroup[] = [];

  constructor(private fb: FormBuilder) {
    this.documentGroupForm = this.fb.group({
      group: ['', [Validators.required]],
      order: ['', [Validators.required]]
    });
  }

  ngOnChanges(): void {
    this.docTypesShadow = cloneDeep(this.docTypes);
    this.docTypesShadow.pop();
    this.docTypesShadow.forEach(it => it.order++);
    this.docTypesShadow.unshift({'topic': 'Jako Pierwsza', 'order': 1 });

  }

  addGroup() {
    if(this.documentGroupForm.valid){
      const newGroupName = this.documentGroupForm.controls['group'].value;
      const order = this.docTypesShadow.find(it => it.topic === this.documentGroupForm.controls['order'].value)!.order;
      this.newDocumentGroupEvent.emit({'topic': newGroupName, 'order': order});
      this.shouldComponentBeRender = false;
      this.documentGroupForm.reset();
    }
  }

  shouldDisplayForm(val: boolean) {
    if(!val){
      this.documentGroupForm.reset();
    }
    this.shouldComponentBeRender = val;
  }
}