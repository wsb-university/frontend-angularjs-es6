export class ContactsListController {
  constructor($state, contactsService) {
    this.$state = $state;
    this.contactsService = contactsService;
    this.contacts = contactsService.contacts;
  }
}
