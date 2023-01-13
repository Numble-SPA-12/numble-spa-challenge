import Component from '@components/core/Component';
import { convertDate } from '../common/utils';
import { navigateTo } from '@common/router';

export default class PostList extends Component {
  template() {
    const { posts } = this.props;
    const cardStyles =
      'cursor-pointer flex w-full flex-row gap-3 ease-in duration-100 hover:translate-x-2 select-none';

    return `
      <div class='w-full mb-5 card-list flex flex-col gap-3' data-component="post-list">
        ${posts
          .map(
            ({ image, title, content, createdAt, postId }) => `
              <div class="card ${cardStyles}" data-card-id="${postId}">
                <div class="bg-origin-border flex-none hover:bg-origin-padding">
                  <img src="${image}" alt="${title}" class="rounded-lg object-cover h-24 w-24" />
                </div>
                <div class="grow w-full min-w-0 flex flex-col gap-1 p-1">
                  <div class="text-xs text-gray-600 line-clamp-2">${convertDate(
                    createdAt
                  )}</div>  
                  <div class="text-md break-all font-bold line-clamp-1">${title}</div>
                  <div class="text-sm break-all text-gray-600 line-clamp-2">${content}</div>
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
