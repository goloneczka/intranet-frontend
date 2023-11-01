import {Injectable} from "@angular/core";
import {environment} from "../../environment/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Employee, EmployeeDepartment} from "../model/employee";

@Injectable()
export class EmployeeService {

  private EMPLOYEE_URL = environment.API_URL + '/employee';
  private EMPLOYEE_WITH_TEAM = environment.API_URL + '/employee-with-team';


  constructor(private http: HttpClient) {}

  public getEmployees() {
    return this.http.get<Employee[]>(this.EMPLOYEE_URL)
  }

  public getEmployeesWithTeams(teamUuid :string | null){
    const queryParams = teamUuid ? new HttpParams().append('teamParentUuid', teamUuid) : new HttpParams();
    return this.http.get<EmployeeDepartment[]>(this.EMPLOYEE_WITH_TEAM, {params: queryParams});
  }
}
