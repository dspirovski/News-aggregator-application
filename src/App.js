import React from "react";
import NewsList from './NewsList';
import Category from './Category';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from 'react-router-dom';

function App() {
  const categories = ['tesla', 'apple'];
  return (
    <div>
      <Router>
        <div className="nav-menu">
          <NavLink to="/">
            <div className="category-menu">Home</div>
          </NavLink>
          {categories.map((item) => (
            <NavLink to={`/categories/${item}`} key={`category-${item}`}>
              <div className="category-menu">{item.charAt(0).toUpperCase() + item.slice(1)}</div>
            </NavLink>
          ))
          }
        </div>
        <div>
          <Switch>
            <Route path="/" exact component={NewsList} />
            <Route path="/categories/:categoryName" component={Category} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
