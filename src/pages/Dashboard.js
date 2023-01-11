import Button from '@components/Button';
import CardList from '@components/CardList';
import Header from '@components/Header';
import Page from '@components/core/Page';
import { navigateTo } from '@common/router';

export default class Dashboard extends Page {
  setup() {
    this.setTitle('Dashboard');
    this.$state = {
      cards: [
        {
          id: 1,
          image: 'https://picsum.photos/200/300',
          title: '제목',
          description: '설명',
        },

        {
          id: 2,
          image: 'https://picsum.photos/200/300',
          title: '제목',
          description: '설명',
        },

        {
          id: 3,
          image: 'https://picsum.photos/200/300',
          title: '제목',
          description: '설명',
        },
      ],
    };
  }

  template() {
    return `
      <div class='w-full flex flex-col items-center'>
        <div class='w-main' data-component="header-container"></div>
        <div class='w-main' data-component="write-button-container"></div>
        <div class='w-main  mt-4' data-component="card-list-container"></div>
      </div>
    `;
  }

  mounted() {
    const { handleNavigateToWrite } = this;
    const $headerContainer = this.$target.querySelector(
      '[data-component="header-container"]'
    );
    const $writeButtonContainer = this.$target.querySelector(
      '[data-component="write-button-container"]'
    );
    const $cardListContainer = this.$target.querySelector(
      '[data-component="card-list-container"]'
    );

    new Header($headerContainer, {
      className: 'h-16 flex justify-between items-center',
    });

    new Button($writeButtonContainer, {
      content: '새 글 작성하기',
      onAction: handleNavigateToWrite.bind(this),
      className:
        'w-full bg-slate-100 hover:bg-slate-200  py-4 px-4 ease-in duration-150 rounded-lg',
    });

    new CardList($cardListContainer, {
      cards: this.$state.cards,
    });
  }

  handleNavigateToWrite() {
    navigateTo('/write');
  }
}
