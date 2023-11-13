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
import {TextFieldModule} from '@angular/cdk/text-field';
import {LeftNavComponent} from './component/left-nav/left-nav.component';
import {ContentHomeComponent, ContentEmployeeComponent, ContentDocumentComponent,
        ContentEmployeeDepartmentComponent } from './component/content/index'
import {PostService, EmployeeService, DocumentService, DutyService, AuthenticationService,
        FilterDutyPipe, ContentTabDisplayPipe, FilterDocumentPipe, HttpInterceptorService,
         BasicAuthInterceptor} from './service/index'
import {HTTP_INTERCEPTORS,  HttpClientModule} from "@angular/common/http";
import { DutyComponent } from './component/right-nav/duty/duty.component';
import {CalendarComponent} from "./component/right-nav/calendar/calendar.component";
import {RightNavParentComponent} from "./component/right-nav/right-nav-parent/right-nav-parent.component";
import { HeaderComponent } from './component/header/header.component';
import {CustomDateFormatterImpl} from "./service/calendar-date-formatter";
import { LoginComponent } from './component/login-component/login.component';
import { MainPageComponent } from './component/main-page/main-page.component';
import { NewDocumentGroupComponent } from './component/content/content-document/new-document-group/new-document-group.component';
import { SortingDialogComponent } from './component/content/content-document/sorting-dialog/sorting-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { EditDocumentGroupDialogComponent } from './component/content/content-document/edit-document-group-dialog/edit-document-group-dialog.component';
import { NewDocumentDialogComponent } from './component/content/content-document/new-document-dialog/new-document-dialog.component';



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
    LoginComponent,
    MainPageComponent,
    ContentEmployeeDepartmentComponent,
    NewDocumentGroupComponent,
    SortingDialogComponent,
    EditDocumentGroupDialogComponent,
    NewDocumentDialogComponent
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
        MatMenuModule,
        MatTooltipModule,
        MatSortModule,
        MatPaginatorModule,
        MatListModule,
        MatDialogModule,
        MatSelectModule,
        TextFieldModule
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
