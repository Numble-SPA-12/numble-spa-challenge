import Component from '@components/core/Component';
import Post from '@components/Post';

export default class PostList extends Component {
  template() {
    if (this.props.posts.length === 0) {
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
