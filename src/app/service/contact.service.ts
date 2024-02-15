import {Injectable} from "@angular/core";
import {environment} from "../../environment/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import { Contact, OrderingContact } from "../model/contact";

@Injectable()
export class ContactService {
  
  private CONTACT_URL = environment.API_URL + '/contact';
  private CONTACT_MODIFY_ORDER = environment.API_URL + '/contact-order';

  constructor(private http: HttpClient) {}

  getConcats() {
    return this.http.get<Contact[]>(this.CONTACT_URL);
  }

  addContact(contact: Contact) {
    return this.http.post<void>(this.CONTACT_URL, contact);
  }

  updateOrders(contactsToUpdate: OrderingContact[]) {
    return this.http.post<void>(this.CONTACT_MODIFY_ORDER, contactsToUpdate);
  }

  delete(contactName: string) {
    return this.http.delete<void>(`${this.CONTACT_URL}/${contactName}`);
  }

  edit(contact: Contact, oldContactName : string) {
    return this.http.put<void>(`${this.CONTACT_URL}/${oldContactName}`, contact);
  }

  // public getDutiesForMonth(date : Date) {
  //   const queryParams = new HttpParams().append('date', date.getTime());
  //   return this.http.get<Duty[]>(this.DUTY_DATE_URL, {params: queryParams});
  // }

  // public getDutyTypes() {
  //   return this.http.get<DutyType[]>(this.DUTY_TYPE_URL);
  // }

  // createNewDuty(result: DutyToSave) {
  //   return this.http.post<void>(this.DUTY_URL, result);
  // }


  
}
