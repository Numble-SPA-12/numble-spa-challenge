import { createPostAPI, updatePostAPI } from '@api/post';

import Button from '@components/Button';
import Header from '@components/Header';
import Input from '@components/Input';
import Page from '@components/core/Page';
import RandomImageSelector from '@components/RandomImageSelector';
import TextArea from '@components/TextArea';
import { getRandomPhotoAPI } from '@api/unsplash';
import { navigateTo } from '@common/router';

class Write extends Page {
  setup() {
    const { data } = this.props;
    this.setTitle(data ? '게시글 수정' : '게시글 작성');

    this.state = {
      title: data ? data.title : '',
      content: data ? data.content : '',
      image: data ? data.image : '',
    };
  }

  template() {
    return `
      <div class='w-full flex flex-col items-center gap-5'>
        <div class='w-main h-16 flex justify-between items-center' data-component="header-container"></div>
        <div class='w-main' data-component="input-image"></div>
        <div class='w-main' data-component="input-title"></div>
        <div class='w-main' data-component="input-content"></div>
        <div class='w-main' data-component="button-container"></div>
      </div>
    `;
  }

  mounted() {
    const isEdit = !!this.props.data;

    const {
      $target,
      handlePostCreate,
      handleTitleChange,
      handleRandomImageSelect,
      handleContentChange,
      handlePostUpdate,
    } = this;

    const { image, title, content } = this.state;

    new Header($target.querySelector('[data-component="header-container"]'));

    new RandomImageSelector(
      $target.querySelector('[data-component="input-image"]'),
      {
        image,
        onClick: handleRandomImageSelect.bind(this),
      }
    );

    new Input($target.querySelector('[data-component="input-title"]'), {
      label: '제목',
      placeholder: '글 제목을 입력해주세요',
      name: 'title',
      value: title,
      onChange: handleTitleChange.bind(this),
    });

    new TextArea($target.querySelector('[data-component="input-content"]'), {
      label: '내용',
      placeholder: '글 내용을 입력해주세요',
      name: 'content',
      value: content,
      onChange: handleContentChange.bind(this),
    });

    new Button($target.querySelector('[data-component="button-container"]'), {
      content: isEdit ? '수정하기' : '등록하기',
      onClick: isEdit
        ? handlePostUpdate.bind(this)
        : handlePostCreate.bind(this),
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

  async handleRandomImageSelect() {
    const url = await getRandomPhotoAPI();
    this.setState({ image: url });
  }

  async handlePostCreate() {
    const post = await createPostAPI(this.state);
    if (!post) return;
    navigateTo('/');
  }

  async handlePostUpdate() {
    const { id } = this.props.data;
    const post = await updatePostAPI(id, this.state);
    if (!post) return;
    navigateTo(`/${id}`);
  }
}

export default Write;
