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
import {ContentHomeComponent} from './component/content/content-home/content-home.component';
import {ContentEmployeeComponent} from './component/content/content-employee/content-employee.component';
import {ContentDocumentComponent} from './component/content/content-document/content-document.component';
import {PostService} from "./service/post.service";
import {HTTP_INTERCEPTORS,  HttpClientModule} from "@angular/common/http";
import {HttpInterceptorService} from "./provider/http-interceptor.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {EmployeeService} from "./service/employee.service";
import {DocumentService} from "./service/document.service";


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
    HttpClientModule,
    MatTableModule,
    MatCardModule
  ],
  providers: [
    PostService,
    EmployeeService,
    DocumentService,
    MatSnackBar,
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
