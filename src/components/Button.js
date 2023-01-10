import Component from '@components/core/Component.js';

export default class Button extends Component {
  template() {
    const { content, className } = this.$props;
    return `
      <button class="button ${className}">
        ${content}
      </button>
    `;
  }

  setEvent() {
    const { onAction } = this.$props;
    this.addEvent('click', '.button', ({ target }) => {
      onAction();
    });
  }
}
