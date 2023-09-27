import { Component } from '@angular/core';
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
    this.documents$ = this.documentService.getDocuments()
  }


}
