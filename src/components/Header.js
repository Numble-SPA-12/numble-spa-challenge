import Button from '@components/Button';
import Component from '@components/core/Component.js';
import Text from '@components/Text';
import backIcon from '@assets/back.svg';
import { navigateTo } from '@common/router';

export default class Header extends Component {
  handleNavigateToBack() {
    history.back();
  }

  handleNavigateToDashboard() {
    navigateTo('/');
  }

  template() {
    return `
      <div data-component="header-back-button"></div>
      <div data-component="header-title"></div>
    `;
  }

  setEvent() {
    this.addEvent('click', '[data-component="header-title"]', () => {
      this.handleNavigateToDashboard();
    });
  }

  mounted() {
    const { handleNavigateToBack } = this;

    const $backButton = this.$target.querySelector(
      '[data-component="header-back-button"]'
    );
    const $title = this.$target.querySelector(
      '[data-component="header-title"]'
    );

    const isDashboard = location.pathname === '/';

    new Button($backButton, {
      content: `<img src=${backIcon} alt="some file" height='20' width='20' />`,
      onClick: handleNavigateToBack.bind(this),
      className: `p-2 hover:bg-slate-100 ease-in duration-150 rounded-md ${
        isDashboard ? 'invisible' : ''
      }`,
    });

    new Text($title, {
      content: 'HPNY 2023',
      className: 'font-light text-lg select-none hover:underline',
    });
  }
}
