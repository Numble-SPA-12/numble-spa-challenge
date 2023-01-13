import Component from '@components/core/Component';
import { deleteCommentAPI } from '@api/comment';
import xIcon from '@assets/x.svg';

export default class Comment extends Component {
  template() {
    const { commentId, content } = this.props;
    return `
      <div class="comment w-full bg-slate-100 p-3 flex flex-row items-start justify-between gap-2 rounded-md" >
        <div class="flex flex-col gap-2">
          <div class="text-xs text-gray-600">${commentId}</div>
          <p class="text-md break-all">${content}</p>
        </div>
        <button class="shrink-0 comment-remove-button select-none p-1 bg-slate-100 hover:bg-slate-200 ease-in duration-150 rounded-md" data-comment-id="${commentId}">
          <img src=${xIcon} alt="some file" height='14' width='14' />
        </button> 
      </div>
    `;
  }

  setEvent() {
    const { handleCommentDelete, commentId } = this.props;

    this.addEvent(
      'click',
      `[data-comment-id="${commentId}"]`,
      async (event) => {
        const code = await deleteCommentAPI(commentId);
        if (code !== 200) return;

        handleCommentDelete(commentId);
      }
    );
  }
}
