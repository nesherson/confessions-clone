import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Post from '../../UI/Post/Post';

const Main = styled.main`
  width: 100%;
  height: calc(100vh - 54px);
`;
const PostList = styled.ul`
  width: 560px;
  margin: 0 auto;
  list-style: none;
  padding: 15px 25px;
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

  const history = useHistory();

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
  }, [posts]);

  const handlePostDetails = (id) => {
    history.push(`/post/${id}`);
  };

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
    <div>
      <Main>
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
                    comments={post.comments.length}
                    like={handlePostLike}
                    dislike={handlePostDislike}
                  >
                    {post.body}
                  </Post>
                );
              })
            : null}
        </PostList>
      </Main>
    </div>
  );
};

export default Posts;
