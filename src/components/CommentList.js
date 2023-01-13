import Comment from '@components/Comment';
import Component from '@components/core/Component';

export default class CommentList extends Component {
  template() {
    return `
      <div class='comment-list flex w-full flex-col gap-3' data-component="comment-list"></div>
    `;
  }

  mounted() {
    const { $target } = this;
    const { comments, handleCommentDelete } = this.props;

    const $commentList = $target.querySelector(
      '[data-component="comment-list"]'
    );

    comments.forEach((comment) => {
      const $component = document.createElement('div');
      $commentList.appendChild($component);

      new Comment($component, {
        ...comment,
        handleCommentDelete,
      });
    });
  }
}
