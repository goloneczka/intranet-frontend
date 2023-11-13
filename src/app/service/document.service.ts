import {Injectable} from "@angular/core";
import {environment} from "../../environment/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Document, DocumentGroup, DocumentToSave} from "../model/document";

@Injectable()
export class DocumentService {
  

  private DOCUMENT_URL = environment.API_URL + '/document';
  private DOCUMENT_DATA_URL = environment.API_URL + '/document-data';
  private DOCUMENT_GROUP_URL = environment.API_URL + '/document-group';
  private DOCUMENT_GROUP_ORDER_URL = environment.API_URL + '/document-group-order';

  constructor(private http: HttpClient) {}

  public getDocuments() {
    return this.http.get<Document[]>(this.DOCUMENT_URL);
  }

  public saveDocument(newDoc: DocumentToSave) {
    let queryParams = new FormData();
    queryParams.append('pdfFile', newDoc.data);
    queryParams.append('comment',  newDoc.comment);
    queryParams.append('topic', newDoc.topic);
    queryParams.append('fileName', newDoc.fileName);
             
    return this.http.post<number>(this.DOCUMENT_URL, queryParams);
  }

  public getDocumentData(fileName: string) {
    const queryParams = new HttpParams().append('fileName', fileName);
    return this.http.get(this.DOCUMENT_DATA_URL, {params: queryParams, responseType: 'blob'});
  }

  public getDocumentTypes() {
    return this.http.get<DocumentGroup[]>(this.DOCUMENT_GROUP_URL);
  }

  public saveDocumentOrderTypes(groups : DocumentGroup[]) {
    const groupsCopy: DocumentGroup[] = [...groups]
    if(groupsCopy[groupsCopy.length-1].topic == ''){
      groupsCopy.pop();
    }
    return this.http.post<void>(this.DOCUMENT_GROUP_ORDER_URL, groupsCopy);
  }

  public saveDocumentType(newGroup: DocumentGroup) {
    return this.http.post<void>(this.DOCUMENT_GROUP_URL, newGroup);
  }

  public updateDocumentType(newGroup: DocumentGroup, oldTopic : string) {
    return this.http.put<void>(`${this.DOCUMENT_GROUP_URL}/${oldTopic}`, newGroup);
  }

  public deleteDocumentType(groupTopic: string) {
    return this.http.delete<void>(`${this.DOCUMENT_GROUP_URL}/${groupTopic}`);
  }
}
