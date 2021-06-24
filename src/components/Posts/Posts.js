import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Post from './Post/Post';

const PostList = styled.ul`
  min-width: 560px;
  width: 598px;
  height: 100%;
  margin: 0;
  list-style: none;
  padding: 10px 0 0 0;
  background-color: #192633;
  border-left: 1px solid rgba(136, 136, 136, 0.25);
  border-right: 1px solid rgba(136, 136, 136, 0.25);

  @media only screen and (max-width: 862px) {
    margin: 0 15% 0 15%;
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

const postData = async (url = '', data = {}) => {
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

const Posts = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetchData('http://localhost:5000/')
      .then((res) => {
        if (isMounted) {
          setPosts(res);
        }
      })
      .catch((err) => {
        console.log('Posts/fetchData - err: ', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handlePostLike = (id) => {
    postData(`http://localhost:5000/post/${id}/like`)
      .then((res) => {
        console.log('Posts/handleLike - res: ', res);
      })
      .catch((err) => {
        console.log('Posts/handleLike - err: ', err);
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
        <PostList>
          {posts
            ? posts.map((post) => {
                return (
                  <Post
                    key={post._id}
                    id={post._id}
                    date={post.date}
                    likes={post.likes}
                    dislikes={post.dislikes}
                    comments={post.comments}
                    like={handlePostLike}
                    dislike={handlePostDislike}
                  >
                    {post.body}
                  </Post>
                );
              })
            : null}
        </PostList>
    </>
  );
};

export default Posts;
