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
import {HttpInterceptorService} from "./service/provider/http-interceptor.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {EmployeeService} from "./service/employee.service";
import {DocumentService} from "./service/document.service";
import { DutyComponent } from './component/right-nav/duty/duty.component';
import {FilterDutyPipe} from "./service/pipe/filter-duty.pipe";
import {DutyService} from "./service/duty.service";
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {CalendarComponent} from "./component/right-nav/calendar/calendar.component";
import {RightNavParentComponent} from "./component/right-nav/right-nav-parent/right-nav-parent.component";
import { HeaderComponent } from './component/header/header.component';
import {ContentTabDisplayPipe} from "./service/pipe/content-tab.pipe";
import {CustomDateFormatterImpl} from "./service/calendar-date-formatter";
import { LoginComponent } from './component/login-component/login.component';
import { MainPageComponent } from './component/main-page/main-page.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {AuthenticationService} from "./service/authentication.service";
import {BasicAuthInterceptor} from "./service/provider/auth-interceptor.service";


@NgModule({
  declarations: [
    AppComponent,
    LeftNavComponent,
    ContentHomeComponent,
    ContentEmployeeComponent,
    ContentDocumentComponent,
    DutyComponent,
    FilterDutyPipe,
    CalendarComponent,
    RightNavParentComponent,
    HeaderComponent,
    ContentTabDisplayPipe,
    LoginComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    HttpClientModule,
    MatTableModule,
    MatCardModule,
    CalendarModule.forRoot({provide: DateAdapter, useFactory: adapterFactory}),
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
    PostService,
    EmployeeService,
    DocumentService,
    DutyService,
    MatSnackBar,
    CustomDateFormatterImpl,
    AuthenticationService,
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
