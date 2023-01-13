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

  async getPost() {
    const { id } = this.props.params;
    const { post, comments } = await getPostAPI(id);
    this.setState({
      post,
      comments: comments.sort((a, b) => b.commentId - a.commentId),
    });
  }

  handleNavigateToEdit() {
    const { id } = this.props.params;
    const { title, content, image } = this.state.post;
    navigateTo(`${id}/edit`, { id, title, content, image });
  }

  async handlePostDelete() {
    const { id } = this.props.params;
    const code = await deletePostAPI(id);

    if (code === 200) navigateTo('/');
  }

  handleCommentAppended(comment) {
    this.setState({
      comments: [comment, ...this.state.comments],
    });
  }

  handleCommentDelete(commentId) {
    this.setState({
      comments: this.state.comments.filter(
        (comment) => comment.commentId !== commentId
      ),
    });
  }

  template() {
    const { image, createdAt, title, content } = this.state.post;
    this.setTitle(`${!!title ? title + '-' : ''} HPNY 2023`);

    return `
      <div class='w-full flex flex-col items-center'>
        <div class='max-w-main w-full px-2 h-16 flex justify-between items-center' data-component="header-container"></div>
        <div class="max-w-main w-full flex flex-col gap-4">
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
        </div>

        <div class='max-w-main w-full px-3 flex flex-col gap-4 my-5'>
          <div class='w-full text-md font-bold text-gray-600'>댓글</div>
          <div class='w-full' data-component="comment-appender-container"></div>
          <div class='w-full' data-component="comments-container"></div>
        </div>
      </div>
    `;
  }

  mounted() {
    const {
      $target,
      props,
      state,
      handleNavigateToEdit,
      handleCommentAppended,
      handleCommentDelete,
      handlePostDelete,
    } = this;

    new Header($target.querySelector('[data-component="header-container"]'));

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

    new CommentAppender(
      $target.querySelector('[data-component="comment-appender-container"]'),
      {
        postId: props.params.id,
        onCommentAppended: handleCommentAppended.bind(this),
      }
    );

    new CommentList(
      $target.querySelector('[data-component="comments-container"]'),
      {
        comments: state.comments,
        handleCommentDelete: handleCommentDelete.bind(this),
      }
    );
  }
}

export default Post;
