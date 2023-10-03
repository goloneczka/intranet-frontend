import { Component } from '@angular/core';
import {contentTab} from "../../model/content-tab";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  ContentEnum = contentTab
  contentType = contentTab.HOME


  contentTypeChange(value: contentTab) {
    this.contentType = value
  }
}
