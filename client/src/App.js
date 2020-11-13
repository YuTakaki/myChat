import React, {useEffect} from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import IsLogin from './components/context/isLogin';
import Dashboard from './components/dashboard/dashboard';
import StrangerDashboard from './components/dashboard_stranger/stranger';
import Home from './components/home';
import axios from 'axios';
import Userdata from './components/context/userData';


function App() {
  return (
    <div className="App">
      <IsLogin>
        <Userdata>
          <Router>
            <Switch>
              <Route path='/home' component={Home} />
              <Route exact path='/stranger' component={StrangerDashboard} />
              <Route path='/' component={Dashboard} />
            </Switch>
          </Router>
        </Userdata>
      </IsLogin>
    </div>
  );
}

export default App;
