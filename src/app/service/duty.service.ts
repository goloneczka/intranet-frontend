import {Injectable} from "@angular/core";
import {environment} from "../../environment/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Duty, DutyType} from "../model/duty";

@Injectable()
export class DutyService {
  

  private DUTY_URL = environment.API_URL + '/duty';
  private DUTY_DATE_URL = environment.API_URL + '/duty-date';

  private DUTY_TYPE_URL = environment.API_URL + '/duty-type';


  constructor(private http: HttpClient) {}

  public getDuties(date : Date) {
    const queryParams = new HttpParams().append('date', date.getTime());

    return this.http.get<Duty[]>(this.DUTY_URL, {params: queryParams});
  }

  public getDutiesForMonth(date : Date) {
    const queryParams = new HttpParams().append('date', date.getTime());
    return this.http.get<Duty[]>(this.DUTY_DATE_URL, {params: queryParams});
  }

  public getDutyTypes() {
    return this.http.get<DutyType[]>(this.DUTY_TYPE_URL);
  }
}
