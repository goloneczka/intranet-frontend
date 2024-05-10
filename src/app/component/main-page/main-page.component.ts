import {Component, OnInit} from '@angular/core';
import {contentTab} from "../../model/content-tab";
import {AuthenticationService} from "../../service/authentication.service";
import { Jwt } from 'src/app/model/jwt';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  contentEnum = contentTab
  contentType : contentTab = contentTab.HOME
  authenticatedUserName : string | undefined
  isFullLeftNav : boolean = false;

  constructor(private authService : AuthenticationService) {}

  ngOnInit(): void {
    const jwt: Jwt | null = this.authService.getJwtUser();
    this.authenticatedUserName = jwt?.sub;
  }

  contentTypeChange(value: contentTab) {
    this.contentType = value
  }

  resizeLeftNav(flag : boolean){
    this.isFullLeftNav = flag;
  }

}
