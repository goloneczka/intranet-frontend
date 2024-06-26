import {Injectable} from "@angular/core";
import {environment} from "../../environment/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Duty, DutyParam, DutyToAccept, DutyToSave, DutyType} from "../model/duty";

@Injectable()
export class DutyService {  

  private DUTY_URL = environment.API_URL + '/duty';
  private DUTY_PARAM_URL = environment.API_URL + '/duty-param';
  private DUTY_DATE_URL = environment.API_URL + '/duty-date';
  private DUTY_TO_ACCEPT_URL = environment.API_URL + '/duty-to-accept';
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

  createNewDuty(result: DutyToSave) {
    return this.http.post<void>(this.DUTY_URL, result);
  }

  getDutiesToAccept() {
    return this.http.get<Duty[]>(this.DUTY_TO_ACCEPT_URL);
  }

  createDutyType(newDutyType: DutyType) {
    return this.http.post<void>(this.DUTY_TYPE_URL, newDutyType);
  }

  deleteDutyType(type: string) {
    return this.http.delete<void>(`${this.DUTY_TYPE_URL}/${type}`);
  }

  editDutyType(dutyType: DutyType, type: string) {
    return this.http.put<void>(`${this.DUTY_TYPE_URL}/${type}`, dutyType);
  }

  createDutyAcceptance(newDutyAcceptance: DutyToAccept) {
    return this.http.post<void>(this.DUTY_TO_ACCEPT_URL,
       {dutyUuid: newDutyAcceptance.uuid, result: newDutyAcceptance.acceptance});
  }

  getDutyParams() {
    return this.http.get<DutyParam>(this.DUTY_PARAM_URL);
  }

  updateDutyParams(dutyParam : DutyParam){
    return this.http.post<void>(this.DUTY_PARAM_URL, dutyParam);
  }
  
}
