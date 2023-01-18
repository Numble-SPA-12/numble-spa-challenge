import Button from '@components/Button';
import Header from '@components/Header';
import Page from '@components/core/Page';
import PostList from '@components/PostList';
import { navigateTo } from '@common/router';

export default class Dashboard extends Page {
  setup() {
    this.setTitle('Dashboard');
  }

  handleNavigateToWrite() {
    navigateTo('/write');
  }

  template() {
    return `
      <div class='w-full flex flex-col items-center'>
        <div class='max-w-main px-2  w-full h-16 flex justify-between items-center' data-component="header"></div>
        <div class='max-w-main px-2 w-full' data-component="write-button"></div>
        <div class='max-w-main px-2 w-full mb-5 card-list flex flex-col gap-3 mt-4' data-component="post-list"></div>
      </div>
    `;
  }

  mounted() {
    const { $target, handleNavigateToWrite } = this;

    new Header($target.querySelector('[data-component="header"]'));

    new Button($target.querySelector('[data-component="write-button"]'), {
      content: '새 글 작성하기',
      onClick: handleNavigateToWrite.bind(this),
      className:
        'w-full bg-slate-100 hover:bg-slate-200 py-4 ease-in duration-150 rounded-lg',
    });

    new PostList($target.querySelector('[data-component="post-list"]'));
  }
}
