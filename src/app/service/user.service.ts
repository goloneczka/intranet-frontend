import {Injectable} from "@angular/core";
import {environment} from "../../environment/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import { User, UserWithRoles } from "../model/user";

@Injectable()
export class UserService {
  
  private USER_URL = environment.API_URL + '/domain-user';
  private USER_PASSWORD_CHANGE_URL = environment.API_URL + '/change-password';

  constructor(private http: HttpClient) {}

  public getUsers() {
    return this.http.get<User[]>(this.USER_URL);
  }

  public updatePassword(oldPassword: string, newPassword: string){
    const queryParams = new HttpParams()
      .append('newPassword', newPassword)
      .append('oldPassword', oldPassword);

    return this.http.put<void>(this.USER_PASSWORD_CHANGE_URL, queryParams);
  }

  createUser(newUser: UserWithRoles) {
    return this.http.post<void>(this.USER_URL, newUser);
  }
}

