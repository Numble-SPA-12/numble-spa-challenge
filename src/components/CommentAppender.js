import Button from '@components/Button';
import Component from '@components/core/Component.js';
import Input from '@components/Input';
import { createCommentAPI } from '@api/comment';
import sendIcon from '@assets/send.svg';

export default class CommentAppender extends Component {
  setup() {
    this.state = { content: '' };
  }

  template() {
    return `
      <div class="comment-appender w-full flex flex-row items-center gap-3">
        <div class="grow" data-component="comment-input"></div>
        <div class="" data-component="comment-submit-button" title="댓글 작성"></div>
      </div>
    `;
  }

  mounted() {
    const { $target, handleCommentInput, handleSubmit } = this;

    new Input($target.querySelector('[data-component="comment-input"]'), {
      name: 'comment',
      value: this.state.content,
      onChange: handleCommentInput.bind(this),
    });

    new Button(
      $target.querySelector('[data-component="comment-submit-button"]'),
      {
        content: `<img src=${sendIcon} alt="some file" height='22' width='22' />`,
        onClick: handleSubmit.bind(this),
        className:
          'p-2 bg-slate-100 hover:bg-slate-200 ease-in duration-150 rounded-md',
      }
    );
  }

  handleCommentInput(content) {
    this.state.content = content;
  }

  async handleSubmit() {
    const { postId, onCommentAppended } = this.props;
    const { content } = this.state;

    if (!content) return;

    const { commentId, ...rest } = await createCommentAPI(postId, { content });
    onCommentAppended({ commentId: String(commentId), ...rest });
    this.setState({ comment: '' });
  }
}
