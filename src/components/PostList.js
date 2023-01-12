import Component from '@components/core/Component';
import { convertDate } from '../common/utils';
import { navigateTo } from '@common/router';

export default class PostList extends Component {
  template() {
    const { posts } = this.$props;
    const cardStyles =
      'cursor-pointer w-full flex  flex-row gap-4 ease-in duration-100 hover:translate-x-2 select-none';

    return `
      <div class='card-list flex flex-col gap-5' data-component="post-list">
        ${posts
          .map(
            ({ image, title, content, createdAt, postId }) => `
              <div class="card ${cardStyles}" data-card-id="${postId}">
                <div class="bg-origin-border hover:bg-origin-padding shrink-0">
                  <img src="${image}" alt="${title}" class="rounded-lg object-cover h-32 w-32" />
                </div>
                <div class="flex flex-col gap-2 p-2">
                  <div class="text-xs text-gray-600 line-clamp-2">${convertDate(
                    createdAt
                  )}</div>  
                  <div class="text-lg font-bold line-clamp-1">${title}</div>
                  <div class="text-sm text-gray-600 line-clamp-2">${content}</div>
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
