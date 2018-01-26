export class ContactsController {
  constructor($state) {
    this.$state = $state;
  }

  showList = () => {
    this.$state.go('list');
  };

  add = () => {
    this.$state.go('add');
  };
}
