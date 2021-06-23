import styled from 'styled-components';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Main = styled.main`
  width: 100%;
  height: calc(100vh - 54px);
`;

const NewPost = styled.div`
  margin: 0 auto;
  border-left: 1px solid rgba(136, 136, 136, 0.25);
  border-right: 1px solid rgba(136, 136, 136, 0.25);
  border-bottom: 1px solid rgba(136, 136, 136, 0.25);
  width: 520px;
`;

const Form = styled.form`
  display: flex;
  flex-flow: column;
  padding: 45px 25px 20px 25px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 150px;
  max-width: 470px;
  min-width: 470px;
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

const AddPost = (e) => {
  const [text, setText] = useState('');

  const history = useHistory();

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const post = {
      body: text,
      likes: 0,
      dislikes: 0,
      comments: [],
      date: new Date(),
    };
    postData('http://localhost:5000/add-post', post)
      .then((res) => {
        console.log('addPost/response: ', res);
      })
      .catch((err) => {
        console.log('addPost/submit - err: ', err);
      });

    history.push('/');
  };

  return (
    <>
      <Main>
        <NewPost>
          <Form onSubmit={handleSubmit}>
            <Textarea
              name='text'
              id='text'
              rows='10'
              onChange={handleTextChange}
              defaultValue='Leave Confession Here'
            ></Textarea>
            <StyledButton type='submit'>Confess</StyledButton>
          </Form>
        </NewPost>
      </Main>
    </>
  );
};

export default AddPost;
