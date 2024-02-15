import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Contact, OrderingContact } from 'src/app/model/contact';
import { ContactService } from 'src/app/service';

@Component({
  selector: 'app-sorting-contacts',
  templateUrl: './sorting-contacts.component.html',
  styleUrl: './sorting-contacts.component.css'
})
export class SortingContactsComponent {

  @Input()
  contacts$ : Observable<Contact[]> = of([]);
  @Output()
  contactsChanged = new EventEmitter<void>();
  
  contactsShadow: OrderingContact[] = [];
  shouldComponentBeRender = false;

  constructor(private contactService: ContactService) {}
  
  ngOnChanges(): void {
    this.contacts$.subscribe(data => {
      this.contactsShadow = data?.map(({contactName, orderContact}) => ({contactName, orderContact}));
    });
  }

  shouldDisplayForm(val : boolean) {
    if(!val) {
      this.contacts$.subscribe(data => {
        this.contactsShadow = data?.map(({contactName, orderContact}) => ({contactName, orderContact}));
      });
    }
    this.shouldComponentBeRender = val;
  }

  onDrop(event: CdkDragDrop<OrderingContact[]>) {
    moveItemInArray(this.contactsShadow, event.previousIndex, event.currentIndex);
  }

  saveOrder() {
    const contactsToUpdate :OrderingContact[] = this.contactsShadow.map((it, ind) => {
        if(it.orderContact === ind+1) {
          return null!;
        }
        it.orderContact = ind +1;
        return it;
    }).filter(it => it !== null);

    if(contactsToUpdate.length){{
      this.contactService.updateOrders(contactsToUpdate).subscribe(_ => {});    
      this.contactsChanged.emit();
    }}
  }

}
