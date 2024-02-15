import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Contact, OrderingContact } from 'src/app/model/contact';
import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.css'
})
export class EditContactComponent {

  currentContactName: string = '';
  contactForm: FormGroup;
  contactShadow: Contact;
  contactsShadow: OrderingContact[] = [];
  
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
   private fb: FormBuilder,
   public dialogRef: MatDialogRef<EditContactComponent>,
   private contactService: ContactService
  ) {
    this.contactShadow = {...data.contact};
    this.currentContactName = this.contactShadow.contactName;

    this.contactForm = this.fb.group({
        orderContact: [this.contactShadow.orderContact, [Validators.required]],
        contactName: [this.contactShadow.contactName, [Validators.required]],
        contact: [this.contactShadow.contact, [Validators.required]],
        type: [this.contactShadow.type, [Validators.required]]
      });

      this.contactsShadow = [...data.contacts];
      this.contactsShadow.forEach(it => it.orderContact++);
      this.contactsShadow.unshift({
        contactName: 'Jako Pierwsza', orderContact: 1
      });
  }

  editContact(){
    const order: number = this.contactForm.controls['orderContact'].value;
    const name: string = this.contactForm.controls['contactName'].value;
    const value: string = this.contactForm.controls['contact'].value;
    const type: string = this.contactForm.controls['type'].value;
    this.contactService.edit({orderContact: order, contactName: name, contact: value, user: '', type: type}, this.currentContactName).subscribe(_ => {
      this.dialogRef.close(true);
    });
  }
}
