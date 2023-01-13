import Component from '@components/core/Component.js';

export default class Input extends Component {
  template() {
    const { placeholder = '', name, label, value, className } = this.props;
    const containerStyle = `flex flex-col gap-3`;
    const inputStyle = `w-full px-4 py-2 border rounded-md`;
    const labelStyle = `${
      !!label ? 'block' : 'hidden'
    } text-md font-bold text-gray-600`;

    return `
      <div class="${containerStyle} ${className}">
        <label for="${name}" class="${labelStyle}">${label}</label>
        <input type="text" placeholder="${placeholder}" class="input ${name} ${inputStyle}" id="${name}" name="${name}" value="${value}" />
      </div>
    `;
  }

  setEvent() {
    const { onChange, name } = this.props;
    this.addEvent('change', `.${name}`, ({ target }) => {
      onChange(target.value);
    });
  }
}
