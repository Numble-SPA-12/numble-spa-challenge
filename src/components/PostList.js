import Component from '@components/core/Component';
import { convertDate } from '../common/utils';
import { getPostsAPI } from '@api/post';
import { navigateTo } from '@common/router';

export default class PostList extends Component {
  setup() {
    this.state = { posts: [] };
    this.getPosts();
  }

  async getPosts() {
    const posts = await getPostsAPI();
    this.setState({ posts: posts.sort((a, b) => b.postId - a.postId) });
  }

  getSkeletonTemplate() {
    const skeleton = new Array(15).fill(0);
    const $skeleton = skeleton
      .map(() => {
        return `
          <div class="animate-pulse cursor-pointer flex w-full flex-row gap-3 mb-3">
            <div class="rounded-lg bg-slate-100 object-cover h-24 w-24"></div>
            <div class="flex-1 space-y-5 py-1">
              <div class="h-2 bg-slate-100 w-40 rounded"></div>
              <div class="h-2 bg-slate-100 rounded"></div>
              <div class="space-y-3">
                <div class="grid grid-cols-3 gap-4">
                  <div class="h-2 bg-slate-100 rounded col-span-2"></div>
                  <div class="h-2 bg-slate-100 rounded col-span-1"></div>
                </div>
                <div class="h-2 bg-slate-100 rounded"></div>
              </div>
            </div>
          </div>
        `;
      })
      .join('');

    return $skeleton;
  }

  getPostTemplate(post) {
    const { postId, image, title, content, createdAt } = post;
    return `
      <div class="card cursor-pointer flex w-full flex-row gap-3 select-none" data-card-id="${postId}">
        <div class="bg-origin-border flex-none">
          <img src="${image}" alt="${title}" class="rounded-lg object-cover h-24 w-24" />
        </div>
        <div class="grow w-full min-w-0 flex flex-col gap-1 p-1">
          <div class="text-xs text-gray-600 line-clamp-2">
            ${convertDate(createdAt)}
          </div>  
          <div class="text-md break-all font-bold line-clamp-1">${title}</div>
          <div class="text-sm break-all text-gray-600 line-clamp-2">${content}</div>
        </div>
      </div>
    `;
  }

  template() {
    if (this.state.posts.length === 0) return this.getSkeletonTemplate();
    return this.state.posts.map((post) => this.getPostTemplate(post)).join('');
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
