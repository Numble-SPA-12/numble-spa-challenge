import Component from '@components/core/Component';

export default class Page extends Component {
  setTitle(title) {
    document.title = title;
  }
  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }
}
