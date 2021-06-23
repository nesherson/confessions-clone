import { useEffect, useState, createRef } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Post from './Post/Post';

const Main = styled.main`
  width: 100%;
  height: calc(100vh - 54px);
`;

const PostWrapper = styled.div`
  margin: 0 auto 25px auto;
  width: 598px;
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
  const params = useParams();

  useEffect(() => {
    let isMounted = true;
    fetchData(`http://localhost:5000/post/${params.id}`)
      .then((res) => {
        if (isMounted) {
          setPost(res);
        }
      })
      .catch((err) => {
        console.log('PostDetails/fetchData - err: ', err);
      });

    return () => {
      isMounted = false;
    };
  }, [params.id, post]);

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

  return (
    <>
      <Main>
        {post ? (
          <PostWrapper>
            <Post
              id={post._id}
              date={post.date}
              likes={post.likes}
              dislikes={post.dislikes}
              comments={post.comments}
              like={handlePostLike}
              dislike={handlePostDislike}
              //handleNewComment={scrollToNewComment}
            >
              {post.body}
            </Post>
          </PostWrapper>
        ) : null}
      </Main>
    </>
  );
};

export default PostDetails;
