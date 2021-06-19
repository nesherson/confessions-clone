import {BrowserRouter as Router, Route} from 'react-router-dom';

import Posts from './components/Posts/Posts';
import AddPost from './components/AddPost/AddPost'

function App() {
  return (
    <Router>
      <Route path='/' exact component={Posts} />
      <Route path='/add-post' component={AddPost}/>
    </Router>
  );
}

export default App;
