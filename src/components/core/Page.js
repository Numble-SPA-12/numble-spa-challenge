import Component from '@components/core/Component';

export default class Page extends Component {
  $params;
  constructor($target, $props, $params) {
    super($target, $props);
    this.$params = $params;
  }
  setTitle(title) {
    document.title = title;
  }
  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }
}
