export class AddContactController {
  name = '';
  phone = '';

  constructor(contactsService, $state) {
    this.contactsService = contactsService;
    this.$state = $state;
  }

  add = () => {
    this.contactsService.add(this.name, this.phone);
    this.$state.go('list');
  };

  back = () => {
    this.$state.go('list');
  };
}
