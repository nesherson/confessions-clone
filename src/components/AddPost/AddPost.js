import styled from 'styled-components';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Header = styled.header`
    height: 54px;
    border-bottom: 1px solid #000;
`;

const Main = styled.main`
    width: 100%;
    height: calc(100vh - 54px);
`

const NewPost = styled.div`
    margin: 0 auto;
    border: 1px solid #000;
    width: 350px;
    
`;

const Form = styled.form`
    display: flex;
    flex-flow: column;
`;

const postData = async (url='', data={}) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        credentials: 'same-origin',
        body: JSON.stringify(data)
    });
        return response.json();
}

const AddPost = (e) => {
    
    const [text, setText] = useState('');

    const history = useHistory();

    const handleTextChange = (e) => {
        setText(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const post = {
            body: text,
            likes: 0,
            dislikes: 0,
            comments: [],
            date: new Date()
        };
        postData('http://localhost:5000/add-post', post)
            .then((res) => {
                console.log('addPost/response: ', res);
            })
            .catch((err) => {
                console.log('addPost/submit - err: ', err);
            });


        history.push('/');
    }

    return (
        <>
        <Header>
            <h1>Confessions</h1> 
        </Header>
        <Main>
            <NewPost>
                <Form onSubmit={handleSubmit}>
                    <textarea name="text" id="text" rows="10" onChange={handleTextChange} value={text}>
                        ...
                    </textarea>
                    <input type='submit' value='Add Post'/>
                </Form>
            </NewPost>
        </Main>
        </>
    );
};

export default AddPost;