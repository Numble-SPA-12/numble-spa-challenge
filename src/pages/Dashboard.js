import Button from '@components/Button';
import Page from '@components/core/Page';
import { navigateTo } from '@common/router';

export default class Dashboard extends Page {
  setup() {
    this.setTitle('Dashboard');
  }

  template() {
    return `
      <div class='w-full flex flex-col items-center'>
        <div class='w-main'>
          <header data-component="item-appender"></header>
          <main data-component="main"></main>
        </div>
      </div>
    `;
  }

  mounted() {
    const { handleNavigateToWrite } = this;
    const $itemAppender = this.$target.querySelector('[data-component="main"]');

    new Button($itemAppender, {
      content: '새 글 작성하기',
      onAction: handleNavigateToWrite.bind(this),
      className:
        'w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md',
    });
  }

  handleNavigateToWrite() {
    navigateTo('/write');
  }
}
