import {Contact} from './model/contact';

export class ContactsService {
  constructor() {
    this.contacts = [];
  }

  add = (name, phone) => {
    this.contacts.push(new Contact(name, phone));
  };
}
