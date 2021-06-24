import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Post from './Post/Post';

const Container = styled.div`
  min-width: 560px;
  width: 598px;
  box-sizing: border-box;
  @media only screen and (max-width: 862px) {
    margin: 0 15% 25px 15%;
  }

  @media only screen and (max-width: 620px) {
    margin: 0;
    width: 100%;
    min-width: 390px;
  }
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
  }, [params.id]);

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

  console.log('re');

  return (
    <>  
        {post ? (
          <Container>
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
          </Container>
        ) : null}
    </>
  );
};

export default PostDetails;
