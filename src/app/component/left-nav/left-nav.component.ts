import {Component, EventEmitter, Output} from '@angular/core';
import {ContentEnum} from "../../model/content.enum";

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.css']
})
export class LeftNavComponent {

  @Output() contentTypeChangeEvent = new EventEmitter<ContentEnum>();

  ContentEnum = ContentEnum


  setContent(contentTypeChange: ContentEnum) {
    console.log("child hello: " + contentTypeChange)
    this.contentTypeChangeEvent.emit(contentTypeChange)
  }
}
