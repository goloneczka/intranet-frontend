import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { Contact } from 'src/app/model/contact';
import { ContactService } from 'src/app/service';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { EditContactComponent } from './edit-contact/edit-contact.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  @Input()
  contacts$ : Observable<Contact[]> = of([]);
  @Output()
  contactsChanged = new EventEmitter<void>();

  isUserAuthenticated: boolean = LocalStorageService.isAuthenticated();

  constructor(private contactService: ContactService, public dialog: MatDialog) {}

  ngOnInit(): void {}


  deleteContact(contact: Contact) {
    this.contactService.delete(contact.contactName).subscribe(_=> {
      this.contactsChanged.emit();
    })
  }

  openDialogEdit(contactToEdit: Contact) {
    this.contacts$.subscribe(data => {
      const contacts = data
        .filter(it => it.contactName !== contactToEdit.contactName)
        .map(it => {
          it.orderContact = it.orderContact > contactToEdit.orderContact ? it.orderContact-- : it.orderContact;
          return it;
        });

      const dialogRef = this.dialog.open(EditContactComponent, {
        data: {contact: contactToEdit, contacts: contacts},
        minWidth: '800px',
        minHeight:'500px',
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.contactsChanged.emit();
        }
      });
    })
  }

}