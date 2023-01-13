import Button from '@components/Button';
import Component from '@components/core/Component';
import { convertDate } from '@common/utils';
import { deletePostAPI } from '@api/post';
import editIcon from '@assets/edit.svg';
import { navigateTo } from '@common/router';
import trashcanIcon from '@assets/trashcan.svg';

export default class Article extends Component {
  setup() {}

  handleNavigateToEdit() {
    const { id, title, content, image } = this.props;
    navigateTo(`${id}/edit`, { id, title, content, image });
  }

  async handlePostDelete() {
    const { id } = this.props;
    const code = await deletePostAPI(id);
    if (code === 200) navigateTo('/');
  }

  template() {
    const { image, createdAt, title, content } = this.props;

    if (!image) return '';

    return `
      <div class='w-full' data-component="image-container">
        <img src="${image}" alt="post image" class="w-full" />
      </div>
      <div class='w-full px-3 flex flex-col gap-2' data-component="article-container">
        <div class="flex flex-col gap-2 mb-10">
          <p class="text-gray-600 break-all text-xs">${convertDate(
            createdAt
          )}</p>
          <h1 class="text-xl break-all font-bold">${title}</h1>
          <p class="text-gray-600 break-all">${content}</p>
        </div>
        <div class="flex justify-end gap-2" >
          <div data-component="edit-button" title="게시글 편집"></div>
          <div data-component="remove-button" title="게시글 삭제"></div>
        </div>
      </div>
    `;
  }

  mounted() {
    const { $target, handleNavigateToEdit, handlePostDelete } = this;

    if (!$target.querySelector('[data-component="image-container"]')) return;

    new Button($target.querySelector('[data-component="edit-button"]'), {
      content: `<img src=${editIcon} alt="some file" height='20' width='20' />`,
      onClick: handleNavigateToEdit.bind(this),
      className: `p-2 bg-slate-100 hover:bg-slate-200 ease-in duration-150 rounded-md`,
    });

    new Button($target.querySelector('[data-component="remove-button"]'), {
      content: `<img src=${trashcanIcon} alt="some file" height='20' width='20' />`,
      onClick: handlePostDelete.bind(this),
      className: `p-2 bg-slate-100 hover:bg-slate-200 ease-in duration-150 rounded-md`,
    });
  }
}
