import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Header = styled.header`
  height: 54px;
  border-bottom: 1px solid #000;
`;

const Main = styled.main`
  width: 100%;
  height: calc(100vh - 54px);
`;
const PostList = styled.ul`
  width: 450px;
  border: 1px solid #000;
  margin: 0 auto;
  list-style: none;
  padding: 15px 25px;
`;

const ListItem = styled.li`
  margin: 15px 0 25px 0;
  border-bottom: 1px solid #ccc;
`;

const ListHeader = styled.h2`
  text-align: center;
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
    fetchData('http://localhost:5000/')
      .then((res) => {
        setPosts(res);
      })
      .catch((err) => {
        console.log('Posts/fetchData - err: ', err);
      });
  }, [posts]);

  const handlePostDetails = (id) => {
    history.push(`/post/${id}`);
  };

  const handlePostLike = (id) => {
    postData(`http://localhost:5000/post/update/${id}?like=true`)
      .then((res) => {
        console.log('Posts/handleLike - res: ', res);
      })
      .catch((err) => {
        console.log('Posts/handleLike - err: ', err);
      });
  };

  const handlePostDislike = (id) => {
    postData(`http://localhost:5000/post/update/${id}?dislike=true`)
      .then((res) => {
        console.log('Posts/handleLike - res: ', res);
      })
      .catch((err) => {
        console.log('Posts/handleLike - err: ', err);
      });
  };

  return (
    <div>
      <Header>
        <h1>Confessions</h1>
      </Header>
      <Main>
        <ListHeader>List of posts:</ListHeader>
        <PostList>
          {posts
            ? posts.map((post) => {
                return (
                  <ListItem key={post._id}>
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
                    <button
                      onClick={() => {
                        handlePostDetails(post._id);
                      }}
                    >
                      Comment
                    </button>
                  </ListItem>
                );
              })
            : null}
        </PostList>
      </Main>
    </div>
  );
};

export default Posts;
