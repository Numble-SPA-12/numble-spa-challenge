import Page from '@components/core/Page';

class Post extends Page {
  setup() {
    this.setTitle('Post Page');
  }

  template() {
    return `
      <div class='w-full flex flex-col items-center gap-5'>
        <div class='w-main' data-component="header-container"></div>
        
        <div class='w-main' data-component="input-title"></div>
        <div class='w-main' data-component="input-content"></div>
        <div class='w-main' data-component="button-container"></div>
      </div>
    `;
  }
}

export default Post;
