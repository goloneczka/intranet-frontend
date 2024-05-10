import {Injectable} from "@angular/core";
import {environment} from "../../environment/environment";
import {HttpClient} from "@angular/common/http";
import {JwtToken} from "../model/jwt-token";
import {LocalStorageService} from "./local-storage.service";
import {Jwt} from "../model/jwt";
import jwt_decode from "jwt-decode";

@Injectable({providedIn: 'root'})
export class AuthenticationService {

  private AUTH_URL = environment.API_URL + '/login';

  constructor(private http: HttpClient) {}

  public login(username: string, password: string) {
    const body = {"email": username, "password": password};
    return this.http.post<JwtToken>(this.AUTH_URL, body)
  }

  public getJwtUser() : Jwt | null{
    const storedJwtText = LocalStorageService.getJwt();
    return storedJwtText ? jwt_decode<Jwt>(storedJwtText) : null;
  }

  public hasAdminRole() {
    const jwt = this.getJwtUser();
    return !!jwt ? jwt.auth.some(it => it.authority === 'ADMIN_USER') : false;
  }

  public hasManagerRole() {
    const jwt = this.getJwtUser();
    return !!jwt ? jwt.auth.some(it => it.authority === 'MANAGER_USER') : false;
  }

  logout() : void {
    LocalStorageService.clearJwt();
  }
}
