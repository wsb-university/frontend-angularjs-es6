import {v4 as uuid} from 'uuid';

export class Contact {
  id;
  name;
  phone;

  constructor(name, phone) {
    this.id = uuid();
    this.name = name;
    this.phone = phone;
  }
}
