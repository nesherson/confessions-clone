import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Header = styled.header`
  height: 54px;
  border-bottom: 1px solid #000;
`;

const Main = styled.main`
  width: 100%;
  height: calc(100vh - 54px);
`;

const Post = styled.div`
  margin: 0 auto;
  border: 1px solid #000;
  width: 350px;
`;

const PostComments = styled.div`
  margin-top: 15px;
  background-color: #ccc;
`;

const CommentList = styled.ul`
  margin: 0;
  padding: 10px;
  list-style: none;
`;

const Comment = styled.li`
  margin: 7px 0;
`;

const NewComment = styled.div`
  margin: 0 auto;
  border: 1px solid #000;
  width: 350px;
`;

const Form = styled.form`
  display: flex;
  flex-flow: column;
`;

const fetchData = async (url = '') => {
  const response = await fetch(url);
  return response.json();
};

const postData = async (url = '', data = []) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    credentials: 'same-origin',
    body: JSON.stringify(data),
  });
  return response.json();
};

const PostDetails = () => {
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [showCommentForm, setShowCommentForm] = useState(false);

  const params = useParams();
  useEffect(() => {
    fetchData(`http://localhost:5000/post/${params.id}`)
      .then((res) => {
        setPost(res);
      })
      .catch((err) => {
        console.log('PostDetails/fetchData - err: ', err);
      });
  }, [post, params.id]);

  const handleShowCommentForm = () => {
    setShowCommentForm((prevState) => !prevState);
  };

  const handleTextChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const comment = {
      body: commentText,
      likes: 0,
      dislikes: 0,
      date: new Date(),
    };
    postData(
      `http://localhost:5000/post/update/${params.id}?comment=true`,
      comment
    )
      .then((res) => {
        console.log('newComment/response: ', res);
      })
      .catch((err) => {
        console.log('newComment/submit - err: ', err);
      });
    handleShowCommentForm();
  };

  const handlePostLike = (id) => {
    postData(`http://localhost:5000/post/update/${id}?like=true`)
      .then((res) => {
        console.log('Posts/handlePostLike - res: ', res);
      })
      .catch((err) => {
        console.log('Posts/handlePostLike - err: ', err);
      });
  };

  const handlePostDislike = (id) => {
    postData(`http://localhost:5000/post/update/${id}?dislike=true`)
      .then((res) => {
        console.log('Posts/handlePostDislike - res: ', res);
      })
      .catch((err) => {
        console.log('Posts/handlePostDislike - err: ', err);
      });
  };

  return (
    <>
      <Header>
        <h1>Confessions</h1>
      </Header>
      <Main>
        {post ? (
          <Post>
            <p>{post.body}</p>
            <span>Likes: {post.likes} </span>
            <button
              onClick={() => {
                handlePostLike(post._id);
              }}
            >
              Like
            </button>
            <span>Dislikes: {post.dislikes}</span>
            <button
              onClick={() => {
                handlePostDislike(post._id);
              }}
            >
              Dislike
            </button>
            <span>Comments: {post.comments.length}</span>
            <PostComments>
              <h3>Comments: </h3>
              {post.comments.length > 0 ? (
                <CommentList>
                  {post.comments.map((comment) => {
                    return <Comment key={comment.body}>{comment.body}</Comment>;
                  })}
                </CommentList>
              ) : (
                <h3>No Comments!</h3>
              )}

              <button onClick={handleShowCommentForm}>
                Leave Your Comment
              </button>
              {showCommentForm ? (
                <NewComment>
                  <Form onSubmit={handleSubmit}>
                    <textarea
                      name='text'
                      id='text'
                      rows='10'
                      onChange={handleTextChange}
                      value={commentText}
                    >
                      ...
                    </textarea>
                    <input type='submit' value='Add Comment' />
                  </Form>
                </NewComment>
              ) : null}
            </PostComments>
          </Post>
        ) : null}
      </Main>
    </>
  );
};

export default PostDetails;
