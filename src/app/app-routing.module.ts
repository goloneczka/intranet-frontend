import {inject, NgModule} from '@angular/core';
import {CanActivateFn, Router, RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./component/login-component/login.component";
import {MainPageComponent} from "./component/main-page/main-page.component";
import {LocalStorageService} from "./service/local-storage.service";


function canActivateToAuthUrls() : CanActivateFn {
  return () => {
    const canActivate : boolean = LocalStorageService.isAuthenticated();
    return canActivate ? canActivate : inject(Router).navigate(['/']);
  }
}

function canActivateToNoAuthUrls() : CanActivateFn{
  return () => {
    const canActivate : boolean = !LocalStorageService.isAuthenticated();
    return canActivate ? canActivate : inject(Router).navigate(['/logged']);
  }
}


function activateAuthOrNotUrl() : CanActivateFn{
  return () => {
    const isAuth : boolean = LocalStorageService.isAuthenticated();
    return isAuth ? inject(Router).navigate(['/logged']) : inject(Router).navigate(['/']);
  }
}

const routes: Routes = [
  { path: '', component: MainPageComponent, canActivate: [canActivateToNoAuthUrls()] },
  { path: 'login', component: LoginComponent, canActivate: [canActivateToNoAuthUrls()] },

  { path: 'logged', component: MainPageComponent, canActivate: [canActivateToAuthUrls()] },

  { path: '**' , redirectTo: '', canActivate: [activateAuthOrNotUrl()]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
