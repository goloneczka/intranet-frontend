import {Component} from '@angular/core';
import {Observable, of} from "rxjs";
import {DocumentService} from "../../../service/document.service";
import {Document, DocumentGroup} from "../../../model/document";
import {LocalStorageService} from "./../../../service/local-storage.service";

@Component({
  selector: 'app-content-document',
  templateUrl: './content-document.component.html',
  styleUrls: ['./content-document.component.css']
})
export class ContentDocumentComponent {

  documents$: Observable<Document[]> = of([]);
  docTypes: DocumentGroup[] = [];

  docTypeTopicsInStringFormat: string = '';
  isSaveOrderBtnDissabled: boolean = true;
  isUserAuthenticated: boolean = LocalStorageService.isAuthenticated();
  
  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.documents$ = this.documentService.getDocuments();
    this.documentService.getDocumentTypes().subscribe(docTypes => {
      docTypes.push({'topic': '', 'order': docTypes.length+1 });
      this.docTypes = docTypes;
      this.docTypeTopicsInStringFormat = JSON.stringify(docTypes.map(it => it.topic));
    });
  }

  getDocumentData(fileName: string) {
    this.documentService.getDocumentData(fileName).subscribe(data => {
        const blob = new Blob([data], { type: 'application/pdf' });
        window.open(URL.createObjectURL(blob), '_blank');
      })
  }

  setOrder(direction : string, order: number) {
    const temp = this.docTypes[order-1];
    if(direction === 'DOWN' && this.docTypes.length-1 !== order) {
      this.docTypes[order-1] = this.docTypes[order];
      this.docTypes[order-1].order--;
      this.docTypes[order] = temp;
      this.docTypes[order].order++;
    } else if(direction === 'UP' && order !== 1){
      this.docTypes[order-1] = this.docTypes[order-2];
      this.docTypes[order-1].order++;
      this.docTypes[order-2] = temp;
      this.docTypes[order-2].order--;
    }
    this.isSaveOrderBtnDissabled = this.docTypeTopicsInStringFormat == JSON.stringify(this.docTypes.map(it => it.topic));
  }

  saveOrder(){
      this.documentService.saveDocumentTypes(this.docTypes).subscribe(_ => {
        this.docTypeTopicsInStringFormat = JSON.stringify(this.docTypes.map(it => it.topic));
        this.isSaveOrderBtnDissabled = true;
      })
  }


}
