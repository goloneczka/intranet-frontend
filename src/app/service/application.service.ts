import {Injectable} from "@angular/core";
import {environment} from "../../environment/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import { EnvApplication, EnvApplicationOrdering } from "../model/application";

@Injectable()
export class ApplicationService {
  
  private ENV_APP_URL = environment.API_URL + '/env-app';
  private ENV_APP_MODIFY_ORDER = environment.API_URL + '/env-app-order';

  constructor(private http: HttpClient) {}

  getEnvApps() {
    return this.http.get<EnvApplication[]>(this.ENV_APP_URL);
  }

  addEnvApp(envApp: EnvApplication) {
    return this.http.post<void>(this.ENV_APP_URL, envApp);
  }

  updateEnvAppsOrder(dtosToUpdate: EnvApplicationOrdering[]) {
    return this.http.post<void>(this.ENV_APP_MODIFY_ORDER, dtosToUpdate);
  }

  delete(name: string) {
    return this.http.delete<void>(`${this.ENV_APP_URL}/${name}`);
  }

  edit(envApp: EnvApplication, oldDtoName : string) {
    return this.http.put<void>(`${this.ENV_APP_URL}/${oldDtoName}`, envApp);
  }
  
}
