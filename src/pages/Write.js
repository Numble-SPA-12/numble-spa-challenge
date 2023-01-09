import AbstractView from '@common/AbstractView';

class Write extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Write');
  }

  async render() {
    return `<h1>This is Write Page</h1>`;
  }
}

export default Write;
