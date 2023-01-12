import Button from '@components/Button';
import Header from '@components/Header';
import Page from '@components/core/Page';
import PostList from '@components/PostList';
import { getPostsAPI } from '@api/post';
import { navigateTo } from '@common/router';

export default class Dashboard extends Page {
  setup() {
    this.setTitle('Dashboard');
    this.$state = { posts: [] };
    this.getPosts();
  }

  template() {
    return `
      <div class='w-full flex flex-col items-center'>
        <div class='w-main h-16 flex justify-between items-center' data-component="header-container"></div>
        <div class='w-main' data-component="write-button-container"></div>
        <div class='w-main  mt-4' data-component="post-list-container"></div>
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
    const $postListContainer = this.$target.querySelector(
      '[data-component="post-list-container"]'
    );

    new Header($headerContainer, {});

    new Button($writeButtonContainer, {
      content: '새 글 작성하기',
      onClick: handleNavigateToWrite.bind(this),
      className:
        'w-full bg-slate-100 hover:bg-slate-200  py-4 px-4 ease-in duration-150 rounded-lg',
    });

    // 스켈레톤 UI를 보여준다
    if (!this.$state.posts) {
      return;
    }

    new PostList($postListContainer, {
      posts: this.$state.posts,
    });
  }

  handleNavigateToWrite() {
    navigateTo('/write');
  }

  async getPosts() {
    const posts = await getPostsAPI();
    this.setState({ posts: posts.sort((a, b) => b.postId - a.postId) });
  }
}
