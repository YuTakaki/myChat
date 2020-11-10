import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import IsLogin from './components/context/isLogin';
import Dashboard from './components/dashboard/dashboard';
import StrangerDashboard from './components/dashboard_stranger/stranger';
import Home from './components/home';

function App() {
  return (
    <div className="App">
      <IsLogin>
        <Router>
          <Switch>
            <Route path='/home' component={Home} />
            <Route exact path='/stranger' component={StrangerDashboard} />
            <Route path='/' component={Dashboard} />
          </Switch>
        </Router>
      </IsLogin>
    </div>
  );
}

export default App;
