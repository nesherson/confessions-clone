import styled from 'styled-components';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Main = styled.main`
  height: calc(100vh - 64px);
  display: flex;
  justify-content: center;
`;

const NewPost = styled.div`
  border-left: 1px solid rgba(136, 136, 136, 0.25);
  border-right: 1px solid rgba(136, 136, 136, 0.25);
  border-bottom: 1px solid rgba(136, 136, 136, 0.25);
  min-width: 560px;
  width: 598px;
  @media only screen and (max-width: 862px) {
    margin: 0 15% 25px 15%;
  }

  @media only screen and (max-width: 620px) {
    width: 100%;
    margin: 0;
    min-width: 390px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-flow: column;
  align-items: center;
  padding: 45px 15% 25px 15%;
  @media only screen and (max-width: 620px) {
    padding: 45px 2% 25px 2%;
    //width: 100%;
  }
`;

const Textarea = styled.textarea`
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
  @media only screen and (max-width: 620px) {
    max-width: 100%;

    min-width: 380px;
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
