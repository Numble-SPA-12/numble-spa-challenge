import Article from '@components/Article';
import CommentContainer from '@components/CommentContainer';
import Header from '@components/Header';
import Page from '@components/core/Page';
import { getPostAPI } from '@api/post';

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
    const { title } = this.state.post;
    this.setTitle(`${!!title ? title + '-' : ''} HPNY 2023`);

    return `
      <div class='w-full flex flex-col items-center'>
        <div class='max-w-main w-full px-2 h-16 flex justify-between items-center' data-component="header-container"></div>
        <article class="max-w-main w-full flex flex-col gap-4" data-component="article-container"></article>
        <div class='max-w-main w-full px-3 flex flex-col gap-4 my-5' data-component="comment-container"></div>
      </div>
    `;
  }

  mounted() {
    const { $target, props, state } = this;

    new Header($target.querySelector('[data-component="header-container"]'));

    new Article($target.querySelector('[data-component="article-container"]'), {
      id: props.params.id,
      image: state.post.image,
      createdAt: state.post.createdAt,
      title: state.post.title,
      content: state.post.content,
    });

    new CommentContainer(
      $target.querySelector('[data-component="comment-container"]'),
      {
        id: props.params.id,
        comments: state.comments,
        handleCommentAppended: this.handleCommentAppended.bind(this),
        handleCommentDelete: this.handleCommentDelete.bind(this),
      }
    );
  }
}

export default Post;
