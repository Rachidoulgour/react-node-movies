import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Signup from './views/Signup';

import './App.css';


function App() {
  return (
    <BrowserRouter>
      <div>
      <Switch>
      <Route path='/signup' component={Signup} exact />
      </Switch>
      </div>
    </BrowserRouter>
    );
    
}

export default App;