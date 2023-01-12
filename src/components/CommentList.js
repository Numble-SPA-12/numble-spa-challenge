import Button from '@components/Button';
import Component from '@components/core/Component';
import xIcon from '@assets/x.svg';

export default class CommentList extends Component {
  template() {
    const { comments } = this.props;
    return `
      <div class='comment-list flex flex-col gap-3' data-component="comment-list">
        ${comments
          .map(
            ({ content, commentId }) => `
              <div class="card bg-slate-100 p-3 flex flex-row items-center gap-2 rounded-md" data-card-id="${commentId}">
                <div class="flex flex-col gap-2">
                  <div class="text-xs text-gray-600">${commentId}</div>
                  <div>${content}</div>
                </div>
                <div data-component="comment-remove-button"></div>
              </div>
            `
          )
          .join('')}
      </div>
    `;
  }

  mounted() {}

  setEvent() {}
}
