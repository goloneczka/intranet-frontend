import {Injectable} from "@angular/core";
import {environment} from "../../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Document} from "../model/document";

@Injectable()
export class DocumentService {

  private DOCUMENT_URL = environment.API_URL + '/document';

  constructor(private http: HttpClient) {}

  public getDocuments() {
    return this.http.get<Document[]>(this.DOCUMENT_URL)
  }
}
