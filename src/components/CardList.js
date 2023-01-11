import Component from '@components/core/Component.js';
import { navigateTo } from '@common/router';

export default class CardList extends Component {
  template() {
    const { cards } = this.$props;
    return `
      <div class='card-list flex flex-col gap-5'>
        ${cards
          .map(
            ({ image, title, description, id }) => `
              <div class="card w-full flex flex-row gap-4 ease-in duration-100 hover:translate-x-2 select-none" data-card-id="${id}">
                <div class="bg-origin-border hover:bg-origin-padding">
                  <img src="${image}" alt="${title}" class="rounded-lg object-cover h-32 w-32" />
                </div>
                <div class="flex flex-col gap-2">
                  <div class="text-lg font-bold">${title}</div>
                  <div class="text-sm">${description}</div>
                </div>
              </div>
            `
          )
          .join('')}
      </div>
    `;
  }

  setEvent() {
    const { handleNavigateToPost } = this;
    this.addEvent('click', '.card', ({ target }) => {
      handleNavigateToPost(target.closest('[data-card-id]').dataset.cardId);
    });
  }

  handleNavigateToPost(id) {
    navigateTo(`/${id}`);
  }
}
