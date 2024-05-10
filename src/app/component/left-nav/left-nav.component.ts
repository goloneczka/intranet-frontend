import {Component, EventEmitter, Output} from '@angular/core';
import {contentTab} from "../../model/content-tab";
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.css']
})
export class LeftNavComponent {

  isFullLeftNav : boolean = false;
  @Output() contentTypeChangeEvent = new EventEmitter<contentTab>();
  @Output() resizeEvent = new EventEmitter<boolean>();
  isAdmin: boolean;
  ContentEnum = contentTab;

  constructor(private authService :AuthenticationService) {
    this.isAdmin = this.authService.hasAdminRole();
  }

  setContent(contentTypeChange: contentTab) {
    this.contentTypeChangeEvent.emit(contentTypeChange);
  }

  resizeLeftNav() {
    this.isFullLeftNav = !this.isFullLeftNav;
    this.resizeEvent.emit(this.isFullLeftNav);
  }
}
