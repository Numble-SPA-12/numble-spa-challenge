import Component from '@components/core/Component.js';

export default class TextArea extends Component {
  template() {
    const { label, placeholder, name, value } = this.props;
    return `
      <div class="flex flex-col gap-3">
        <label for="${name}" class="${
      !!label ? 'block' : 'hidden'
    } text-md font-bold text-gray-600">${label}</label>
        <textarea placeholder="${placeholder}" id="${name}" name="${name}" class="w-full h-40 border rounded-lg p-4 ${name}">${value}</textarea>
      </div>
    `;
  }

  setEvent() {
    const { onChange, name } = this.props;
    this.addEvent('change', `.${name}`, ({ target }) => {
      onChange(document.getElementById(name).value);
    });
  }
}
