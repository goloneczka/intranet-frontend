import {Component} from '@angular/core';
import {Observable, of} from "rxjs";
import {DocumentService} from "../../../service/document.service";
import {Document} from "../../../model/document";

@Component({
  selector: 'app-content-document',
  templateUrl: './content-document.component.html',
  styleUrls: ['./content-document.component.css']
})
export class ContentDocumentComponent {

  documents$: Observable<Document[]> = of([]);

  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    this.documents$ = this.documentService.getDocuments();
  }

  getDocumentData(fileName: string) {
    this.documentService.getDocumentData(fileName).subscribe(data => {
        const blob = new Blob([data], { type: 'application/pdf' });
        window.open(URL.createObjectURL(blob), '_blank');
      })
  }


}
