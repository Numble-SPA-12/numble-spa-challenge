import Component from '@components/core/Component.js';
import imageIcon from '@assets/image.svg';

export default class RandomImageSelector extends Component {
  template() {
    const { image } = this.props;
    const containerStyle = `w-full flex align-cetner justify-center border rounded-lg h-80 hover:bg-slate-100 ease-in duration-150 cursor-pointer`;
    const imageStyle = `select-none rounded-lg w-full hover:opacity-80 ease-in duration-150 ${
      image ? 'object-cover ' : 'object-none'
    }`;

    return `
      <div class='w-full write-image-container ${containerStyle}'>
        <img src="${
          image ? image : imageIcon
        }" alt="random image" class="${imageStyle}" />
      </div>
    `;
  }

  setEvent() {
    const { onClick } = this.props;
    this.addEvent('click', '.write-image-container', ({ target }) => {
      onClick();
    });
  }
}
