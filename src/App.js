import {BrowserRouter as Router, Route} from 'react-router-dom';

import Posts from './components/Posts/Posts';
import AddPost from './components/AddPost/AddPost'
import PostDetails from './components/PostDetails/PostDetails';

function App() {
  return (
    <Router>
      <Route path='/' exact component={Posts} />
      <Route path='/add-post' component={AddPost}/>
      <Route path='/post/:id' component={PostDetails}/>
    </Router>
  );
}

export default App;
