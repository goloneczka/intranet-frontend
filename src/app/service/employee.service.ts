import {Injectable} from "@angular/core";
import {environment} from "../../environment/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Employee, EmployeeDepartment, TeamTree} from "../model/employee";

@Injectable()
export class EmployeeService {

  private EMPLOYEE_URL = environment.API_URL + '/employee';
  private EMPLOYEE_WITH_TEAM = environment.API_URL + '/employee-with-team';
  private TEAM = environment.API_URL + '/team';


  constructor(private http: HttpClient) {}

  public getEmployees() {
    return this.http.get<Employee[]>(this.EMPLOYEE_URL);
  }

  public getEmployee(email : string) {
    return this.http.get<Employee>(`${this.EMPLOYEE_URL}/${email}`);
  }

  public saveEmployee(employee: Employee) {
    return this.http.post<void>(this.EMPLOYEE_URL, employee);
  }

  public getTeamsTree() {
    return this.http.get<TeamTree>(`${this.TEAM}/tree`);
  }

  public getEmployeesWithTeams(teamUuid :string | null){
    const queryParams = teamUuid ? new HttpParams().append('teamParentUuid', teamUuid) : new HttpParams();
    return this.http.get<EmployeeDepartment[]>(this.EMPLOYEE_WITH_TEAM, {params: queryParams});
  }

  public gesNestedTeamsInTree(teamName: string, tree: TeamTree) : string[]  {
    const treeSearch = new EmployeeTreeSearch(teamName);
    treeSearch.find(tree);
    return treeSearch.response;
  }
}


class EmployeeTreeSearch {

  private nameToFind : string = '';
  private searchFlag : boolean = true;
  response : string[] = [];

  constructor(teamName : string) {
    this.nameToFind = teamName;
  }

  find(tree: TeamTree)  {
    if(this.nameToFind === tree.team?.teamName) {
      this.prepareResponseTeamNames(tree);
      this.searchFlag = false;
    }
    if(this.searchFlag) {
      tree.children.forEach(it => this.find(it));
    }
  }

  private prepareResponseTeamNames(tree: TeamTree) {
    this.response.push(tree.team.teamName);
    tree.children.forEach(it => this.prepareResponseTeamNames(it));
  }



}
