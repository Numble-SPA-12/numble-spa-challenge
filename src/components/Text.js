import Component from '@components/core/Component.js';

export default class Text extends Component {
  template() {
    const { content, className } = this.props;
    return `
      <span class="text ${className}">
        ${content}
      </span>
    `;
  }
}
