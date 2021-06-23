import { useState, forwardRef } from 'react';
import styled from 'styled-components';

import { parseDate } from '../../../../util/helpers';

import Comment from './Comment/Comment';

const Container = styled.div`
  border-bottom: 1px solid rgba(136, 136, 136, 0.25);
`;

const Comments = styled.div`
  display: flex;
  flex-flow: column;
`;

const CommentList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  background-color: #15202b;
`;

const NewComment = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  background-color: #15202b;
`;

const Form = styled.form`
  width: 80%;
  display: flex;
  flex-flow: column;
  align-items: center;
  @media only screen and (max-width: 620px) {
    width: 100%;
  }
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

const Button = styled.button`
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 400;
  padding: 10px 20px;
  max-width: 150px;
  margin: 25px;
  background-color: #8aa9c1;
  color: #fff;
  border: none;
  border-radius: 5px;
`;

const Warning = styled.p`
  color: #eb4034;
  font-size: 0.85rem;
  padding: 0;
  margin: 2px 0 0 0;
  height: 18px;
`;

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

const PostComments = forwardRef(
  ({ postId, comments, newComment, showNewComment }, ref) => {
    const [commentText, setCommentText] = useState('');
    const [isNewCommentEmpty, setIsNewCommentEmpty] = useState(false);

    const handleTextChange = (e) => {
      setCommentText(e.target.value);
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      if (commentText.length < 1) {
        setIsNewCommentEmpty(true);
        return;
      }

      const comment = {
        body: commentText,
        likes: 0,
        dislikes: 0,
        date: new Date(),
      };
      postData(`http://localhost:5000/post/${postId}/comment`, comment)
        .then((res) => {
          console.log('newComment/response: ', res);
        })
        .catch((err) => {
          console.log('newComment/submit - err: ', err);
        });
      setIsNewCommentEmpty(false);
      showNewComment();
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

    console.log('re');
    return (
      <Container>
        <Comments>
          {comments.length > 0 ? (
            <CommentList>
              {comments.map((comment) => {
                return (
                  <Comment
                    key={comment._id}
                    date={parseDate(comment.date)}
                    likes={comment.likes}
                    dislikes={comment.dislikes}
                    likeComment={() => {
                      handleCommentLike(postId, comment._id);
                    }}
                    dislikeComment={() => {
                      handleCommentDislike(postId, comment._id);
                    }}
                  >
                    {comment.body}
                  </Comment>
                );
              })}
            </CommentList>
          ) : null}
        </Comments>
        <NewComment>
          <Button onClick={showNewComment} ref={ref}>
            Leave Your Comment
          </Button>
          {newComment ? (
            <Form onSubmit={handleSubmit}>
              <Textarea
                name='text'
                id='text'
                onChange={handleTextChange}
                placeholder='Comment Here'
                value={commentText}
              ></Textarea>
              {isNewCommentEmpty ? (
                <Warning>Field Empty!</Warning>
              ) : (
                <Warning></Warning>
              )}
              <Button type='submit'>Add Comment</Button>
            </Form>
          ) : null}
        </NewComment>
      </Container>
    );
  }
);

export default PostComments;
