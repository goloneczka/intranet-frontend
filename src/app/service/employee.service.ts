import {Injectable} from "@angular/core";
import {environment} from "../../environment/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Employee,  Team,  TeamTree} from "../model/employee";

@Injectable()
export class EmployeeService {

  private EMPLOYEE_URL = environment.API_URL + '/employee';
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

  public updateEmployee(emp: Employee) {
    return this.http.put<void>(`${this.EMPLOYEE_URL}/${emp.email}`, emp);
  }

  public deleteEmployee(email: string) {
    return this.http.delete<void>(`${this.EMPLOYEE_URL}/${email}`);
  }

  public deleteTeam(name: string) {
    return this.http.delete<void>(`${this.TEAM}/${name}`);
  }

  public updateTeam(team: Team, oldName : string) {
    return this.http.put<void>(`${this.TEAM}/${oldName}`, team);
  }
  

  public saveTeam(team: Team) {
    return this.http.post<void>(this.TEAM, team);
  }

  public getTeamsTree() {
    return this.http.get<TeamTree>(`${this.TEAM}/tree`);
  }

  public gesNestedTeamsInTree(teamName: string, tree: TeamTree) : string[]  {
    const treeSearch = new EmployeeTreeSearch(teamName);
    treeSearch.find(tree);
    return treeSearch.response;
  }

  gesTeamParentInTree(teamName: string, tree: TeamTree) : string  {
    const treeSearch = new EmployeeTreeSearch(teamName);
    treeSearch.findParentName(tree, null);
    return treeSearch.response[0] || '';
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

  findParentName(tree: TeamTree, parentTree: TeamTree | null) {
    if(this.nameToFind === tree.team?.teamName) {
      this.response = [parentTree?.team?.teamName || ''];
      this.searchFlag = false;
    }
    if(this.searchFlag) {
      tree.children.forEach(it => this.findParentName(it, tree));
    }
  }



}
