// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';
import UserLogin from './components/UserLogin';
import UserRegister from './components/UserRegister';
import UserProfile from './components/UserProfile';
import AdminRoute from './components/AdminRoute';
import { useParams } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login" component={UserLogin} />
          <Route path="/register" component={UserRegister} />
          <Route path="/books" component={BookList} />
          <Route path="/books/:id" component={BookDetails} />
          <AdminRoute path="/admin/books/:id" component={AdminBookDetails} />
          <Route path="/profile" component={UserProfile} />
          <Route exact path="/" component={HomePage} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
