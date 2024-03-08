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
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { QuillModule } from 'ngx-quill';
import { CommonModule, DatePipe } from '@angular/common';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import {HTTP_INTERCEPTORS,  HttpClientModule} from "@angular/common/http";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatRadioModule } from '@angular/material/radio';
import {MatTabsModule} from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


import {LeftNavComponent} from './component/left-nav/left-nav.component';

import { ContentDocumentComponent, NewDocumentDialogComponent,
  EditDocumentGroupDialogComponent, NewDocumentGroupComponent,
  SortingDocumentComponent, EditDocumentDialogComponent } from './component/content/content-document/index';

import {ContentDutyComponent, DailDutyListComponent,
  DutyAcceptanceComponent, EditDutyTypeComponent,
  EditDutyTypeDisplayModeComponent, EditDutyTypeEditModeComponent,
  HorizontalSchedulerComponent, NewDutyDialogComponent,
  NewDutyTypeComponent} from './component/content/content-duty/index';

import {ContentEmployeeComponent, EditEmployeeTeamDialogComponent,
  EmployeeDetailsComponent, NewEmployeeComponent,
  NewEmployeeTeamComponent, EditTeamComponent, 
  EditTeamDisplayModeComponent, EditTeamEditModeComponent,
  EmployeeMigrationComponent } from './component/content/content-employee/index';

import {ContentHomeComponent, NewPostComponent,
  EditPostComponent, DisplayPostComponent} from './component/content/content-home';

import {ContentLinkComponent, ContactComponent,
   EnviromentsComponent, NewContactComponent,
  SortingContactsComponent, EditContactComponent,
  NewEnvAppComponent, EditEnvAppComponent,
  SortingEnvAppComponent} from './component/content/content-link';

import {RightNavParentComponent, DutyComponent,
  MonthlyCalendarComponent, DisplayPostDialogComponent} from './component/right-nav';


import {PostService, EmployeeService, DocumentService, DutyService, AuthenticationService,
        FilterDutyPipe, ContentTabDisplayPipe, FilterDocumentPipe, HttpInterceptorService,
        BasicAuthInterceptor, SafeHtmlPipe, CreationTimeRepresentationPipe,
        ContactService, ApplicationService } from './service/index';

import { HeaderComponent } from './component/header/header.component';
import { LoginComponent } from './component/login-component/login.component';
import { MainPageComponent } from './component/main-page/main-page.component';
import { FooterComponent } from './component/footer/footer.component';



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
    RightNavParentComponent,
    HeaderComponent,
    ContentTabDisplayPipe,
    LoginComponent,
    MainPageComponent,
    NewDocumentGroupComponent,
    SortingDocumentComponent,
    EditDocumentGroupDialogComponent,
    NewDocumentDialogComponent,
    NewPostComponent,
    SafeHtmlPipe,
    DisplayPostComponent,
    EditPostComponent,
    EmployeeDetailsComponent,
    NewEmployeeComponent,
    NewEmployeeTeamComponent,
    EditEmployeeTeamDialogComponent,
    ContentDutyComponent,
    HorizontalSchedulerComponent,
    DailDutyListComponent,
    NewDutyDialogComponent,
    DutyAcceptanceComponent,
    NewDutyTypeComponent,
    CreationTimeRepresentationPipe,
    EditDutyTypeComponent,
    EditDutyTypeEditModeComponent,
    EditDutyTypeDisplayModeComponent,
    FooterComponent,
    MonthlyCalendarComponent,
    DisplayPostDialogComponent,
    ContentLinkComponent,
    ContactComponent,
    EnviromentsComponent,
    NewContactComponent,
    SortingContactsComponent,
    EditContactComponent,
    NewEnvAppComponent,
    EditEnvAppComponent,
    SortingEnvAppComponent,
    EditDocumentDialogComponent,
    EditTeamComponent, 
    EditTeamDisplayModeComponent,
    EditTeamEditModeComponent,
    EmployeeMigrationComponent
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
        MatNativeDateModule,
        MatProgressBarModule,
        NgxMatTimepickerModule,
        DragDropModule,
        MatRadioModule,
        MatTabsModule,
        MatProgressSpinnerModule
    ],
  providers: [
    PostService,
    EmployeeService,
    DocumentService,
    DutyService,
    ContactService,
    MatSnackBar,
    AuthenticationService,
    ApplicationService,
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true},
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
