import {Injectable} from "@angular/core";
import {environment} from "../../environment/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Post} from "../model/post";
import {Employee} from "../model/employee";

@Injectable()
export class EmployeeService {

  private EMPLOYEE_URL = environment.API_URL + '/employee';

  constructor(private http: HttpClient) {}

  public getEmployees() {
    return this.http.get<Employee[]>(this.EMPLOYEE_URL)
  }
}
