import { deletePostAPI, getPostAPI } from '@api/post';

import Button from '@components/Button';
import CommentAppender from '@components/CommentAppender';
import CommentList from '@components/CommentList';
import Header from '@components/Header';
import Page from '@components/core/Page';
import { convertDate } from '@common/utils';
import editIcon from '@assets/edit.svg';
import { navigateTo } from '@common/router';
import trashcanIcon from '@assets/trashcan.svg';

class Post extends Page {
  setup() {
    this.state = { post: {}, comments: [] };
    this.getPost();
  }

  template() {
    const { image, createdAt, title, content } = this.state.post;
    this.setTitle(`${!!title ? title + '-' : ''} HPNY 2023`);

    return `
      <div class='w-full flex flex-col items-center gap-5'>
        <div class='w-main h-16 flex justify-between items-center' data-component="header-container"></div>
        <div class='w-main' data-component="image-container">
          <img src="${image}" alt="post image" class="w-full" />
        </div>
        <div class='w-main flex flex-col gap-3' data-component="article-container">
          <p class="text-gray-600 text-sm">${convertDate(createdAt)}</p>
          <h1 class="text-2xl font-bold">${title}</h1>
          <p class="text-gray-600">${content}</p>
          <div class="flex justify-end gap-2" >
            <div data-component="edit-button"></div>
            <div data-component="remove-button"></div>
          </div>
        </div>

        <div class='flex flex-col gap-4 my-5'>
          <div class='text-md font-bold text-gray-600'>댓글</div>
          <div class='w-main' data-component="comment-appender-container"></div>
          <div class='w-main' data-component="comments-container"></div>
        </div>
      </div>
    `;
  }

  mounted() {
    const { handleNavigateToEdit, handleCommentAppended, handlePostDelete } =
      this;

    const $headerContainer = this.$target.querySelector(
      '[data-component="header-container"]'
    );
    const $editButton = this.$target.querySelector(
      '[data-component="edit-button"]'
    );
    const $removeButton = this.$target.querySelector(
      '[data-component="remove-button"]'
    );
    const $commentAppender = this.$target.querySelector(
      '[data-component="comment-appender-container"]'
    );
    const $commentsContainer = this.$target.querySelector(
      '[data-component="comments-container"]'
    );

    new Header($headerContainer, {
      className: 'h-16 flex justify-between items-center',
    });

    new Button($editButton, {
      content: `<img src=${editIcon} alt="some file" height='20' width='20' />`,
      onClick: handleNavigateToEdit.bind(this),
      className: `p-2 bg-slate-100 hover:bg-slate-200 ease-in duration-150 rounded-md`,
    });

    new Button($removeButton, {
      content: `<img src=${trashcanIcon} alt="some file" height='20' width='20' />`,
      onClick: handlePostDelete.bind(this),
      className: `p-2 bg-slate-100 hover:bg-slate-200 ease-in duration-150 rounded-md`,
    });

    new CommentAppender($commentAppender, {
      postId: this.props.params.id,
      onCommentAppended: handleCommentAppended.bind(this),
    });

    new CommentList($commentsContainer, {
      comments: this.state.comments,
      handleCommentDelete: this.handleCommentDelete.bind(this),
    });
  }

  async getPost() {
    const { id } = this.props.params;
    const { post, comments } = await getPostAPI(id);
    this.setState({
      post,
      comments: comments.sort((a, b) => b.commentId - a.commentId),
    });
  }

  handleNavigateToEdit() {}

  handleCommentAppended(comment) {
    this.setState({
      comments: [comment, ...this.state.comments],
    });
  }

  async handlePostDelete() {
    const { id } = this.props.params;
    const code = await deletePostAPI(id);
    navigateTo('/');
  }

  handleCommentDelete(commentId) {
    this.setState({
      comments: this.state.comments.filter(
        (comment) => comment.commentId !== commentId
      ),
    });
  }
}

export default Post;
