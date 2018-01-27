import {Contact} from './model/contact';

export class ContactsService {
  static STORAGE_KEY = 'CONTACTS';

  constructor() {
    this.contacts = this.getState();
  }

  add = (name, phone) => {
    this.contacts.push(new Contact(name, phone));
    this.keepState();
  };

  delete = id => {
    const index = this.contacts.map(contact => contact.id).indexOf(id);
    this.contacts.splice(index, 1);
    this.keepState();
  };

  getState = () => {
    const data = localStorage.getItem(ContactsService.STORAGE_KEY);
    let contacts = [];
    if (data) {
      contacts = JSON.parse(data);
    }
    return contacts;
  };

  keepState = () => {
    localStorage.setItem(
      ContactsService.STORAGE_KEY,
      JSON.stringify(this.contacts),
    );
  };
}
