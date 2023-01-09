import AbstractView from '@common/AbstractView';

class Post extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Post');
  }

  async render() {
    console.log(this.params);
    return '<h1>This is Post Page</h1>';
  }
}

export default Post;
