import Button from '@components/Button';
import Component from '@components/core/Component.js';
import Text from '@components/Text';
import backIcon from '@assets/back.svg';

export default class Header extends Component {
  template() {
    const { className } = this.$props;
    return `
      <header class="header ${className}"></header>
    `;
  }

  mounted() {
    const { handleNavigateToBack } = this;
    const $header = this.$target.querySelector('.header');
    const isDashboard = location.pathname === '/';

    new Button($header, {
      content: `<img src=${backIcon} alt="some file" height='20' width='20' />`,
      onAction: handleNavigateToBack.bind(this),
      className: `p-2 hover:bg-slate-100 ease-in duration-150 rounded-md ${
        isDashboard ? 'invisible' : ''
      }`,
    });

    new Text($header, {
      content: 'HPNY 2023',
      className: 'font-light text-lg select-none',
    });
  }

  handleNavigateToBack() {
    history.back();
  }
}
