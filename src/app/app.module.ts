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
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatMenuModule} from "@angular/material/menu";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatListModule} from "@angular/material/list";
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {MatSnackBar} from "@angular/material/snack-bar";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {TextFieldModule} from '@angular/cdk/text-field';
import {LeftNavComponent} from './component/left-nav/left-nav.component';
import {ContentHomeComponent, ContentEmployeeComponent, ContentDocumentComponent,
        NewDocumentDialogComponent, NewPostComponent, EditDocumentGroupDialogComponent,
        NewDocumentGroupComponent, SortingDialogComponent } from './component/content/index';
import {PostService, EmployeeService, DocumentService, DutyService, AuthenticationService,
        FilterDutyPipe, ContentTabDisplayPipe, FilterDocumentPipe, HttpInterceptorService,
         BasicAuthInterceptor, PostOrderPipe, SafeHtmlPipe } from './service/index';
import {HTTP_INTERCEPTORS,  HttpClientModule} from "@angular/common/http";
import { DutyComponent } from './component/right-nav/duty/duty.component';
import {CalendarComponent} from "./component/right-nav/calendar/calendar.component";
import {RightNavParentComponent} from "./component/right-nav/right-nav-parent/right-nav-parent.component";
import { HeaderComponent } from './component/header/header.component';
import {CustomDateFormatterImpl} from "./service/calendar-date-formatter";
import { LoginComponent } from './component/login-component/login.component';
import { MainPageComponent } from './component/main-page/main-page.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { QuillModule } from 'ngx-quill';
import { CommonModule } from '@angular/common';
import { DisplayPostComponent } from './component/content/content-home/display-post/display-post.component';
import { EditPostComponent } from './component/content/content-home/edit-post/edit-post.component';
import { EmployeeDetailsComponent } from './component/content/content-employee/employee-details/employee-details.component';
import { NewEmployeeComponent } from './component/content/content-employee/new-employee/new-employee.component';
import { NewEmployeeTeamComponent } from './component/content/content-employee/new-employee-team/new-employee-team.component';



@NgModule({
  declarations: [
    AppComponent,
    LeftNavComponent,
    ContentHomeComponent,
    ContentEmployeeComponent,
    ContentDocumentComponent,
    DutyComponent,
    FilterDutyPipe,
    FilterDocumentPipe,
    CalendarComponent,
    RightNavParentComponent,
    HeaderComponent,
    ContentTabDisplayPipe,
    PostOrderPipe,
    LoginComponent,
    MainPageComponent,
    NewDocumentGroupComponent,
    SortingDialogComponent,
    EditDocumentGroupDialogComponent,
    NewDocumentDialogComponent,
    NewPostComponent,
    SafeHtmlPipe,
    DisplayPostComponent,
    EditPostComponent,
    EmployeeDetailsComponent,
    NewEmployeeComponent,
    NewEmployeeTeamComponent,
  ],
    imports: [
        CommonModule,
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
        MatMenuModule,
        MatTooltipModule,
        MatSortModule,
        MatPaginatorModule,
        MatListModule,
        MatDialogModule,
        MatSelectModule,
        TextFieldModule,
        QuillModule.forRoot(),
        MatSlideToggleModule,
        MatDatepickerModule,
        MatNativeDateModule 
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
