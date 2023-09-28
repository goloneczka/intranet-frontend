import {Injectable} from "@angular/core";
import {environment} from "../../environment/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Document} from "../model/document";

@Injectable()
export class DocumentService {

  private DOCUMENT_URL = environment.API_URL + '/document';
  private DOCUMENT_DATA_URL = environment.API_URL + '/document-data';


  constructor(private http: HttpClient) {}

  public getDocuments() {
    return this.http.get<Document[]>(this.DOCUMENT_URL)
  }

  public getDocumentData(fileName: string) {
    const queryParams = new HttpParams().append('fileName', fileName);
    return this.http.get(this.DOCUMENT_DATA_URL, {params: queryParams, responseType: 'blob'});
  }
}
