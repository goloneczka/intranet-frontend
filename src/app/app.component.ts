import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'intranet-app';
  contentType = 'home';

  contentTypeChange(value: string) {
    this.contentType = value
  }
}
