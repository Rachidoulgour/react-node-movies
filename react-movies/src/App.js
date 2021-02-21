import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css';
import Signup from './views/Signup';
import Login from './views/Login';
import Home from './views/Home';


function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/login' component={Login} exact />
          <Route path='/signup' component={Signup} exact />
        </Switch>
      </div>
    </BrowserRouter>
    );
    
}

export default App;