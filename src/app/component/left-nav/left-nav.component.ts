import {Component, EventEmitter, Output} from '@angular/core';
import {contentTab} from "../../model/content-tab";

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.css']
})
export class LeftNavComponent {

  @Output() contentTypeChangeEvent = new EventEmitter<contentTab>();

  ContentEnum = contentTab


  setContent(contentTypeChange: contentTab) {
    this.contentTypeChangeEvent.emit(contentTypeChange)
  }
}
