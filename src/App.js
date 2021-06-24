import styled from 'styled-components';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Posts from './components/Posts/Posts';
import AddPost from './components/AddPost/AddPost';
import PostDetails from './components/PostDetails/PostDetails';

const Main = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
`;

function App() {
  return (
    <Router>
      <Header />
      <Main>
      <Route path='/' exact component={Posts} />
      <Route path='/add-post' component={AddPost} />
      <Route path='/post/:id' component={PostDetails} />
      </Main>
    </Router>
  );
}

export default App;
