import Button from '@components/Button';
import Header from '@components/Header';
import Page from '@components/core/Page';
import PostList from '@components/PostList';
import { getPostsAPI } from '@api/post';
import { navigateTo } from '@common/router';

export default class Dashboard extends Page {
  setup() {
    this.setTitle('Dashboard');
    this.state = { posts: [] };
    this.getPosts();
  }

  async getPosts() {
    const posts = await getPostsAPI();
    console.log(posts);
    this.setState({ posts: posts.sort((a, b) => b.postId - a.postId) });
  }

  handleNavigateToWrite() {
    navigateTo('/write');
  }

  template() {
    return `
      <div class='w-full flex flex-col items-center'>
        <div class='max-w-main px-2  w-full h-16 flex justify-between items-center' data-component="header-container"></div>
        <div class='max-w-main px-2 w-full' data-component="write-button-container"></div>
        <div class='max-w-main px-2  w-full mt-4' data-component="post-list-container"></div>
      </div>
    `;
  }

  mounted() {
    const { $target, handleNavigateToWrite } = this;

    new Header($target.querySelector('[data-component="header-container"]'));

    new Button(
      $target.querySelector('[data-component="write-button-container"]'),
      {
        content: '새 글 작성하기',
        onClick: handleNavigateToWrite.bind(this),
        className:
          'w-full bg-slate-100 hover:bg-slate-200  py-4 px-4 ease-in duration-150 rounded-lg',
      }
    );

    if (!this.state.posts) {
      return;
    }

    new PostList(
      $target.querySelector('[data-component="post-list-container"]'),
      {
        posts: this.state.posts,
      }
    );
  }
}
