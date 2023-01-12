import Component from '@components/core/Component';
import { deleteCommentAPI } from '@api/comment';
import xIcon from '@assets/x.svg';

export default class CommentList extends Component {
  template() {
    const { comments } = this.props;
    return `
      <div class='comment-list flex flex-col gap-3' data-component="comment-list">
        ${comments
          .map(
            ({ content, commentId }) => `
              <div class="comment bg-slate-100 p-3 flex flex-row items-start justify-between gap-2 rounded-md" >
                <div class="flex flex-col gap-2">
                  <div class="text-xs text-gray-600">${commentId}</div>
                  <div>${content}</div>
                </div>
                <button class="comment-remove-button select-none p-1 bg-slate-100 hover:bg-slate-200 ease-in duration-150 rounded-md" data-comment-id="${commentId}">
                  <img src=${xIcon} alt="some file" height='18' width='18' />
                </button> 
              </div>
            `
          )
          .join('')}
      </div>
    `;
  }

  setEvent() {
    const { handleCommentDelete } = this.props;

    this.addEvent('click', '[data-component="comment-list"]', async (event) => {
      const $comment = event.target.closest('.comment-remove-button');
      if (!$comment) return;

      const commentId = $comment.dataset.commentId;
      const code = await deleteCommentAPI(commentId);
      if (code !== 200) return;

      handleCommentDelete(commentId);
    });
  }
}
