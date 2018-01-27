export class ContactsListController {
  constructor($state, contactsService) {
    this.$state = $state;
    this.contactsService = contactsService;
    this.contacts = contactsService.contacts;
  }

  edit = contact => {
    this.$state.go('edit', {
      id: contact.id,
    });
  };

  delete = id => {
    this.contactsService.delete(id);
  };
}
