import {AfterContentChecked, Component, Input} from '@angular/core';
import {AuthenticationService} from "../../service/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {

  @Input('user')
  userMail: string | undefined;

  constructor(private authService : AuthenticationService,
              private router : Router) {}


  logoutUser(): void {
    this.authService.logout();
    this.router.navigate(['/'])
  }

}
