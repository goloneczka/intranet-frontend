import { Component } from '@angular/core';
import {contentTab} from "./model/content-tab";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'intranet-app'

  ContentEnum = contentTab
  contentType = contentTab.HOME


  contentTypeChange(value: contentTab) {
    this.contentType = value
  }
}
