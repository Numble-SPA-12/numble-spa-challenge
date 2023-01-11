import Header from '@components/Header';
import Page from '@components/core/Page';

class Write extends Page {
  setup() {
    this.setTitle('Write Page');
  }

  template() {
    return `
      <div class='w-full flex flex-col items-center'>
        <div class='w-main' data-component="main"></div>
      </div>
    `;
  }

  mounted() {
    const $main = this.$target.querySelector('[data-component="main"]');

    new Header($main, {
      className: 'h-16 flex justify-between items-center',
    });
  }
}

export default Write;
