import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {LeftNavComponent} from './component/left-nav/left-nav.component';
import {ContentHomeComponent} from './component/content-home/content-home.component';
import {ContentEmployeeComponent} from './component/content-employee/content-employee.component';
import {ContentDocumentComponent} from './component/content-document/content-document.component';


@NgModule({
  declarations: [
    AppComponent,
    LeftNavComponent,
    ContentHomeComponent,
    ContentEmployeeComponent,
    ContentDocumentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
