import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from './Components/Navigation';
import CreateNote from './Components/CreateNote';
import CreateUser from './Components/CreateUser';
import NoteList from './Components/NoteList';

function App() {
  return (
    <Router>
      <Navigation />

      <Route exact path="/" component={NoteList} />
      <Route path="/edit/:id" component={CreateNote} />
      <Route path="/create" component={CreateNote} />
      <Route path="/user" component={CreateUser} />
    </Router>
  );
}

export default App;
