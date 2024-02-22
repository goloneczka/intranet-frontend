import { Component, ViewChild } from '@angular/core';
import { Contact } from 'src/app/model/contact';
import { NewContactComponent } from './contact/new-contact/new-contact.component';
import { SortingContactsComponent } from './contact/sorting-contacts/sorting-contacts.component';
import { ContactService } from 'src/app/service/contact.service';
import { Observable, of } from 'rxjs';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { NewEnvAppComponent } from './enviroments/new-env-app/new-env-app.component';
import { SortingEnvAppComponent } from './enviroments/sorting-env-app/sorting-env-app.component';
import { EnvApplication } from 'src/app/model/application';
import { ApplicationService } from 'src/app/service';

@Component({
  selector: 'app-content-link',
  templateUrl: './content-link.component.html',
  styleUrl: './content-link.component.css'
})
export class ContentLinkComponent {

  @ViewChild(NewContactComponent)
  newContactChild!: NewContactComponent;
  @ViewChild(SortingContactsComponent)
  sortingContactsChild!: SortingContactsComponent;

  @ViewChild(NewEnvAppComponent)
  newEnvAppChild!: NewEnvAppComponent;
  @ViewChild(SortingEnvAppComponent)
  sortingEnvAppChild!: SortingEnvAppComponent;

  isUserAuthenticated: boolean = LocalStorageService.isAuthenticated();
  contacts$ : Observable<Contact[]> = of([]);
  envApps$ : Observable<EnvApplication[]> = of([]);


  constructor(private contactService: ContactService, private envAppService: ApplicationService) {}

  ngOnInit() {
    this.initContacts();
    this.initApps();
  }

  sortingContacts(){
    this.sortingContactsChild.shouldDisplayForm(true);
  }

  addContact() {
    this.newContactChild.shouldDisplayForm(true);
  }

  reRenderContacts() {
      this.initContacts();
  }

  private initContacts() {
    this.contacts$ = this.contactService.getConcats();
  }

  private initApps() {
    this.envApps$ = this.envAppService.getEnvApps();
  }

  sortingEnv(){
    this.sortingEnvAppChild.shouldDisplayForm(true);
  }

  addEnv() {
    this.newEnvAppChild.shouldDisplayForm(true);
  }

  reRenderApps() {
    this.initApps();
  }
}
