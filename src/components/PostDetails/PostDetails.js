import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import FeatherIcon from 'feather-icons-react';

import Comment from '../../UI/Comment/Comment';

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
  border: 1px solid rgba(136, 136, 136, 0.25);
  width: 598px;
`;

const Wrapper = styled.div`
  padding: 10px 15px 0 15px;
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PostId = styled.span`
  color: #bccedc;
  font-size: 0.9rem;
`;

const PostDate = styled.span`
  color: #bccedc;
  font-size: 0.9rem;
`;

const PostText = styled.p`
  color: #fff;
  font-size: 1.25rem;
`;

const StyledSpan = styled.span`
  color: #bccedc;
  font-size: 1.05rem;
  margin-right: 10px;
`;

const Number = styled.span`
  color: #fff;
  padding-left: 3px;
  font-weight: bold;
`;

const StyledDiv = styled.div`
  margin: 0;
  padding: 15px 0;
  border-top: 1px solid rgba(136, 136, 136, 0.25);
`;

const PostComments = styled.div`
  border-top: 1px solid rgba(136, 136, 136, 0.25);
  display: flex;
  flex-flow: column;
`;

const CommentList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const NewComment = styled.div`
  margin: 0 auto;
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-flow: column;
  width: 80%;
  margin: 0 auto;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 150px;
  max-width: 478px;
  background-color: #2a4055;
  font-family: inherit;
  font-size: 1.05rem;
  padding: 5px;
  box-sizing: border-box;
  border: 1px solid rgba(136, 136, 136, 0.25);
  color: #bccedc;
  &:focus {
    background-color: #15202b;
    border: 1px solid rgba(136, 136, 136, 0.5);
    outline: none;
  }
  transition: background-color 0.2s ease;
`;

const IconWrapper = styled.div`
  margin: 0;
  padding: 15px 0;
  display: flex;
  justify-content: space-evenly;
  border-top: 1px solid rgba(136, 136, 136, 0.25);
`;

const StyledIcon = styled(FeatherIcon)`
  margin: 0 25px;
  stroke: #bccedc;
  &:hover {
    stroke: #8aa9c1;
  }
`;

const StyledButton = styled.button`
  box-sizing: border-box;
  font-size: 1.01rem;
  padding: 10px 20px;
  max-width: 150px;
  align-self: center;
  margin: 25px;
  background-color: #8aa9c1;
  color: #fff;
  border: none;
  border-radius: 5px;
`;

const fetchData = async (url = '') => {
  const response = await fetch(url);
  return response.json();
};

const parseDate = (date) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString('en-GB', options);
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

  const newCommentRef = useRef(null);

  const params = useParams();
  useEffect(() => {
    fetchData(`http://localhost:5000/post/${params.id}`)
      .then((res) => {
        setPost(res);
      })
      .catch((err) => {
        console.log('PostDetails/fetchData - err: ', err);
      });
  }, [params.id]);

  const handleShowCommentForm = () => {
    if (showCommentForm) {
      setShowCommentForm(false);
    } else {
      setShowCommentForm(true);
    }
  };

  const handleTextChange = (e) => {
    setCommentText(e.target.value);
  };

  const scrollToNewComment = () => {
    handleShowCommentForm();
    newCommentRef.current.scrollIntoView();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const comment = {
      body: commentText,
      likes: 0,
      dislikes: 0,
      date: new Date(),
    };
    postData(`http://localhost:5000/post/${params.id}/comment`, comment)
      .then((res) => {
        console.log('newComment/response: ', res);
      })
      .catch((err) => {
        console.log('newComment/submit - err: ', err);
      });
    handleShowCommentForm();
  };

  const handlePostLike = (id) => {
    postData(`http://localhost:5000/post/${id}/like`)
      .then((res) => {
        console.log('Posts/handlePostLike - res: ', res);
      })
      .catch((err) => {
        console.log('Posts/handlePostLike - err: ', err);
      });
  };

  const handlePostDislike = (id) => {
    postData(`http://localhost:5000/post/${id}/dislike`)
      .then((res) => {
        console.log('Posts/handlePostDislike - res: ', res);
      })
      .catch((err) => {
        console.log('Posts/handlePostDislike - err: ', err);
      });
  };

  const handleCommentLike = (postId, commentId) => {
    postData(`http://localhost:5000/post/${postId}/comment/${commentId}/like`)
      .then((res) => {
        console.log('Posts/handleCommentLike - res: ', res);
      })
      .catch((err) => {
        console.log('Posts/handleCommentLike - err: ', err);
      });
  };

  const handleCommentDislike = (postId, commentId) => {
    postData(
      `http://localhost:5000/post/${postId}/comment/${commentId}/dislike`
    )
      .then((res) => {
        console.log('Posts/handleCommentDislike - res: ', res);
      })
      .catch((err) => {
        console.log('Posts/handleCommentDislike - err: ', err);
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
            <Wrapper>
              <PostHeader>
                <PostId>{post._id}</PostId>
                <PostDate>{parseDate(post.date)}</PostDate>
              </PostHeader>
              <PostText>{post.body}</PostText>
              <StyledDiv>
                <StyledSpan>
                  Likes: <Number>{post.likes}</Number>{' '}
                </StyledSpan>
                <StyledSpan>
                  Dislikes: <Number>{post.dislikes}</Number>
                </StyledSpan>
                <StyledSpan>
                  Comments: <Number>{post.comments.length}</Number>
                </StyledSpan>
              </StyledDiv>
              <IconWrapper>
                <StyledIcon
                  icon='thumbs-up'
                  size='20'
                  onClick={() => {
                    handlePostLike(post._id);
                  }}
                />
                <StyledIcon
                  icon='thumbs-down'
                  size='20'
                  onClick={() => {
                    handlePostDislike(post._id);
                  }}
                />
                <StyledIcon
                  icon='message-square'
                  size='20'
                  onClick={scrollToNewComment}
                />
              </IconWrapper>
            </Wrapper>
            <PostComments>
              {post.comments.length > 0 ? (
                <CommentList>
                  {post.comments.map((comment) => {
                    return (
                      <Comment
                        key={comment._id}
                        date={parseDate(comment.date)}
                        likes={comment.likes}
                        dislikes={comment.dislikes}
                        likeComment={() => {
                          handleCommentLike(post._id, comment._id);
                        }}
                        dislikeComment={() => {
                          handleCommentDislike(post._id, comment._id);
                        }}
                      >
                        {comment.body}
                      </Comment>
                    );
                  })}
                </CommentList>
              ) : (
                <h3>No Comments!</h3>
              )}

              <StyledButton onClick={handleShowCommentForm} ref={newCommentRef}>
                Leave Your Comment
              </StyledButton>
              {showCommentForm ? (
                <NewComment>
                  <Form onSubmit={handleSubmit}>
                    <Textarea
                      name='text'
                      id='text'
                      onChange={handleTextChange}
                      placeholder='Comment Here'
                      value={commentText}
                    ></Textarea>
                    <StyledButton type='submit'>Add Comment</StyledButton>
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
