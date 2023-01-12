import Component from '@components/core/Component.js';

export default class Button extends Component {
  template() {
    const { content, className } = this.props;
    return `
      <button class="button select-none ${className}">
        ${content}
      </button>
    `;
  }

  setEvent() {
    const { onClick } = this.props;
    this.addEvent('click', '.button', ({ target }) => {
      handleClick();
    });

    function handleClick() {
      onClick();
    }
  }
}
