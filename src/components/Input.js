import Component from '@components/core/Component.js';

export default class Input extends Component {
  template() {
    const { placeholder, name, label, value } = this.$props;
    return `
      <div class="flex flex-col gap-3">
        <label for="${name}" class="${
      !!label ? 'block' : 'hidden'
    } text-md font-bold text-gray-600">${label}</label>
        <input type="text" placeholder="${placeholder}" class="input w-full px-5 py-3 border rounded-md ${name}" id="${name}" name="${name}" value="${value}" />
      </div>
    `;
  }

  setEvent() {
    const { onChange, name } = this.$props;
    this.addEvent('change', `.${name}`, ({ target }) => {
      onChange(target.value);
    });
  }
}
