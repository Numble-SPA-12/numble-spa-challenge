import Component from '@components/core/Component';
import Post from '@components/Post';

export default class PostList extends Component {
  template() {
    return `
      <div class='w-full mb-5 card-list flex flex-col gap-3' data-component="post-list"></div>
    `;
  }

  mounted() {
    const { posts } = this.props;
    const $postList = this.$target.querySelector(
      '[data-component="post-list"]'
    );

    posts.forEach((post) => {
      const $component = document.createElement('div');
      $postList.appendChild($component);
      new Post($component, {
        ...post,
      });
    });
  }
}
