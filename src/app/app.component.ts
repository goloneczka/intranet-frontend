import { Component } from '@angular/core';
import {ContentEnum} from "./model/content.enum";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'intranet-app'

  ContentEnum = ContentEnum
  contentType = ContentEnum.HOME


  contentTypeChange(value: ContentEnum) {
    this.contentType = value
  }
}
