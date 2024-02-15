import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cloneDeep } from 'lodash';
import { Observable, of } from 'rxjs';
import { Contact, OrderingContact } from 'src/app/model/contact';
import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrl: './new-contact.component.css'
})
export class NewContactComponent {

  @Input()
  contacts$ : Observable<Contact[]> = of([]);
  @Output()
  addedEvent = new EventEmitter<void>();


  contactsShadow: OrderingContact[] = [];
  shouldComponentBeRender = false;
  contactForm: FormGroup;

  
  constructor(private fb: FormBuilder,
     private contactService: ContactService
  ) {
    this.contactForm = this.fb.group({
      orderContact: ['', [Validators.required]],
      contactName: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      type: ['phone', [Validators.required]]
    });
  }

  ngOnChanges(): void {
    this.contacts$.subscribe(data => {
      this.contactsShadow = cloneDeep(data);
      this.contactsShadow.forEach(it => it.orderContact++);
      this.contactsShadow.unshift({
        contactName: 'Jako Pierwsza', orderContact: 1
      });
    });
  }

  shouldDisplayForm(val : boolean) {
    this.shouldComponentBeRender = val;
    if(!val) {
      this.contactForm.reset();
    }
  }

  addContact() {
    if(this.contactForm.valid){
      const order: number = this.contactForm.controls['orderContact'].value;
      const name: string = this.contactForm.controls['contactName'].value;
      const value: string = this.contactForm.controls['contact'].value;
      const type: string = this.contactForm.controls['type'].value;
      this.contactService.addContact({orderContact: order, contactName: name, contact: value, user: '', type: type}).subscribe(_ => {
        this.shouldComponentBeRender = false;
        this.addedEvent.emit();
        this.contactForm.reset();
      });
    }
  }

}
