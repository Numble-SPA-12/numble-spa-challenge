import Button from '@components/Button';
import Header from '@components/Header';
import Input from '@components/Input';
import Page from '@components/core/Page';
import TextArea from '@components/TextArea';
import { createPostAPI } from '@api/post';
import { getRandomPhotoAPI } from '@api/unsplash';
import imageIcon from '@assets/image.svg';
import { navigateTo } from '@common/router';

class Write extends Page {
  setup() {
    this.setTitle('Write Page');
    this.$state = { title: '', content: '', image: '' };
  }

  template() {
    const { image } = this.$state;
    return `
      <div class='w-full flex flex-col items-center gap-5'>
        <div class='w-main h-16 flex justify-between items-center' data-component="header-container"></div>
        <div class='write-image-container w-main flex align-cetner justify-center  
          border rounded-lg h-80 hover:bg-slate-100 ease-in duration-150 cursor-pointer'>
          <img src="${image}" alt="image" class="${
      !image && 'hidden'
    } select-none object-cover w-full rounded-lg hover:opacity-80 ease-in duration-150" />
          <img src="${imageIcon}" alt="image" class="${
      !!image && 'hidden'
    } select-none" />
        </div>
        <div class='w-main' data-component="input-title"></div>
        <div class='w-main' data-component="input-content"></div>
        <div class='w-main' data-component="button-container"></div>
      </div>
    `;
  }

  setEvent() {
    this.addEvent('click', '.write-image-container', ({ target }) => {
      this.getRandomImage();
    });
  }

  mounted() {
    const { createPost, handleTitleChange, handleContentChange } = this;

    const $headerContainer = this.$target.querySelector(
      '[data-component="header-container"]'
    );
    const $buttonContainer = this.$target.querySelector(
      '[data-component="button-container"]'
    );
    const $inputTitle = this.$target.querySelector(
      '[data-component="input-title"]'
    );
    const $inputContent = this.$target.querySelector(
      '[data-component="input-content"]'
    );

    new Header($headerContainer, {
      className: 'h-16 flex justify-between items-center',
    });

    new Input($inputTitle, {
      label: '제목',
      placeholder: '글 제목을 입력해주세요',
      name: 'title',
      value: this.$state.title,
      onChange: handleTitleChange.bind(this),
    });

    new TextArea($inputContent, {
      label: '내용',
      placeholder: '글 내용을 입력해주세요',
      name: 'content',
      value: this.$state.content,
      onChange: handleContentChange.bind(this),
    });

    new Button($buttonContainer, {
      content: '등록하기',
      onClick: createPost.bind(this),
      className:
        'w-full bg-slate-100 hover:bg-slate-200  py-4 px-4 ease-in duration-150 rounded-lg',
    });
  }

  handleTitleChange(title) {
    this.setState({ title });
  }

  handleContentChange(content) {
    this.setState({ content });
  }

  async getRandomImage() {
    const url = await getRandomPhotoAPI();
    this.setState({ image: url });
  }

  async createPost() {
    const post = await createPostAPI(this.$state);
    if (!post) return;
    navigateTo('/');
  }
}

export default Write;
