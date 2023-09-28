import {Injectable} from "@angular/core";
import {environment} from "../../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Duty} from "../model/duty";

@Injectable()
export class DutyService {

  private DUTY_URL = environment.API_URL + '/duty';

  constructor(private http: HttpClient) {}

  public getDuties() {
    return this.http.get<Duty[]>(this.DUTY_URL)
  }
}
