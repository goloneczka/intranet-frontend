import { Component, ViewChild } from '@angular/core';
import { Contact } from 'src/app/model/contact';
import { NewContactComponent } from './contact/new-contact/new-contact.component';
import { SortingContactsComponent } from './contact/sorting-contacts/sorting-contacts.component';
import { ContactService } from 'src/app/service/contact.service';
import { Observable, of } from 'rxjs';
import { LocalStorageService } from 'src/app/service/local-storage.service';

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

  isUserAuthenticated: boolean = LocalStorageService.isAuthenticated();
  contacts$ : Observable<Contact[]> = of([]);

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.initContacts();
  }

  sortingContacts(){
    this.sortingContactsChild.shouldDisplayForm(true);
  }

  addContact() {
    this.newContactChild.shouldDisplayForm(true);
  }

  reRender() {
      this.initContacts();
  }

  private initContacts() {
    this.contacts$ = this.contactService.getConcats();
  }
}
