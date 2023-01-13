import CommentAppender from '@components/CommentAppender';
import CommentList from '@components/CommentList';
import Component from '@components/core/Component';

export default class CommentContainer extends Component {
  setup() {}

  template() {
    return `
      <div class='w-full text-md font-bold text-gray-600'>댓글</div>
      <div class='w-full' data-component="comment-appender-container"></div>
      <div class='w-full' data-component="comments-container"></div>
    `;
  }

  mounted() {
    const { $target, props } = this;

    new CommentAppender(
      $target.querySelector('[data-component="comment-appender-container"]'),
      {
        postId: props.id,
        onCommentAppended: props.handleCommentAppended,
      }
    );

    new CommentList(
      $target.querySelector('[data-component="comments-container"]'),
      {
        comments: props.comments,
        handleCommentDelete: props.handleCommentDelete,
      }
    );
  }
}
