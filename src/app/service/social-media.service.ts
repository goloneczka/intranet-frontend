import {Injectable} from "@angular/core";
import {environment} from "../../environment/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import { EnvApplication, EnvApplicationOrdering } from "../model/application";
import { SocialParamWithName } from "../model/param";

@Injectable()
export class SocialMediaService {

  private SOCIAL_MEDIA_URL = environment.API_URL + '/social-media';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<SocialParamWithName[]>(this.SOCIAL_MEDIA_URL);
  }

  update(dto: SocialParamWithName) {
    return this.http.put<void>(this.SOCIAL_MEDIA_URL, dto);
  }

  
}
