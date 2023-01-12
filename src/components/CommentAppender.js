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
        <div class="" data-component="comment-submit-button"></div>
      </div>
    `;
  }

  mounted() {
    const { handleCommentInput, handleSubmit } = this;

    const $commentInput = this.$target.querySelector(
      '[data-component="comment-input"]'
    );
    const $submitButton = this.$target.querySelector(
      '[data-component="comment-submit-button"]'
    );

    new Input($commentInput, {
      name: 'comment',
      value: this.state.content,
      onChange: handleCommentInput.bind(this),
    });

    new Button($submitButton, {
      content: `<img src=${sendIcon} alt="some file" height='22' width='22' />`,
      onClick: handleSubmit.bind(this),
      className:
        'p-2 bg-slate-100 hover:bg-slate-200 ease-in duration-150 rounded-md',
    });
  }

  handleCommentInput(content) {
    this.setState({ content });
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
