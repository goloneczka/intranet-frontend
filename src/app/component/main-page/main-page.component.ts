import {Component} from '@angular/core';
import {contentTab} from "../../model/content-tab";
import {AuthenticationService} from "../../service/authentication.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {

  public contentEnum = contentTab
  public contentType : contentTab = contentTab.HOME

  public authenticatedUserName : string | undefined

  constructor(private authService : AuthenticationService) {}

  ngOnInit(): void {
    this.authenticatedUserName = this.authService.getJwtUser()?.sub;
  }
  contentTypeChange(value: contentTab) {
    this.contentType = value
  }
}
