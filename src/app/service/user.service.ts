import {Injectable} from "@angular/core";
import {environment} from "../../environment/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Employee,  EmployeeMail,  Team,  TeamTree} from "../model/employee";
import { User } from "../model/user";

@Injectable()
export class UserService {
  
  private USER_URL = environment.API_URL + '/domain-user';
  private PARAM_URL = environment.API_URL + '/users';

  constructor(private http: HttpClient) {}

  public getUsers() {
    return this.http.get<User[]>(this.USER_URL);
  }

  public getParams(){
    return this.http.get<Employee[]>(this.PARAM_URL);
  }
}

