import {Injectable} from "@angular/core";
import {environment} from "../../environment/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Employee, EmployeeDepartment} from "../model/employee";
import {Observable} from "rxjs";


const employeeHeadData  = [
  {
    'team': 'Zarzad',
    'teamParent' : null,
    'employeeList' : [
      {
        'firstName': 'string',
        'lastName': 'string',
        'email': 'string',
        'title': 'string',
        'phoneNumber': 'string',
        'isManager': true
      }
    ]
  },
  {
    'team': 'Dział IT',
    'teamParent' : null,
    'employeeList' : [
      {
        'firstName': 'string',
        'lastName': 'string',
        'email': 'string',
        'title': 'string',
        'phoneNumber': 'string',
        'isManager': true
      },
      {
        'firstName': 'string',
        'lastName': 'string',
        'email': 'string',
        'title': 'string',
        'phoneNumber': 'string',
        'isManager': false
      }
    ]
  }
]

const employeeDeveloperData  = [
  {
    'team': 'Programisci',
    'teamParent' : 'Dział IT',
    'employeeList' : [
      {
        'firstName': 'string',
        'lastName': 'string',
        'email': 'string',
        'title': 'string',
        'phoneNumber': 'string',
        'isManager': true
      },
      {
        'firstName': 'string',
        'lastName': 'string',
        'email': 'string',
        'title': 'string',
        'phoneNumber': 'string',
        'isManager': true
      }
    ]
  }
]
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

  searchForChildDepartments(team: string) {
    if (team === 'Zarzad')
      return [];
    else if (team === 'Dział IT')
      return employeeDeveloperData;
    else if (team === 'Programisci')
      return [];
    console.log("team: ", team, " sie zesralo");
    return [];

  }
}
