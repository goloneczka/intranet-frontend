import {Injectable} from "@angular/core";
import {environment} from "../../environment/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Document, DocumentGroup} from "../model/document";

@Injectable()
export class DocumentService {
 
  private DOCUMENT_URL = environment.API_URL + '/document';
  private DOCUMENT_DATA_URL = environment.API_URL + '/document-data';
  private DOCUMENT_GROUP_URL = environment.API_URL + '/document-group';

  constructor(private http: HttpClient) {}

  public getDocuments() {
    return this.http.get<Document[]>(this.DOCUMENT_URL);
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
    return this.http.post<void>(this.DOCUMENT_GROUP_URL, groupsCopy);
  }

  public saveDocumentType(group: any) {
    throw new Error('Method not implemented.');
  }
}
