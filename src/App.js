import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Posts from './components/Posts/Posts';
import AddPost from './components/AddPost/AddPost';
import PostDetails from './components/PostDetails/PostDetails';

function App() {
  return (
    <Router>
      <Header />
      <Route path='/' exact component={Posts} />
      <Route path='/add-post' component={AddPost} />
      <Route path='/post/:id' component={PostDetails} />
    </Router>
  );
}

export default App;
