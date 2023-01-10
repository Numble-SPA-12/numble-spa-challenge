import Page from '@components/core/Page';

class Post extends Page {
  setup() {
    this.setTitle('Post Page');
  }

  template() {
    return '<h1>This is Post Page</h1>';
  }
}

export default Post;
