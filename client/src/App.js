import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import Dashboard from './components/dashboard/dashboard';
import MessageList from './components/dashboard/messageList';
import OpenMessage from './components/dashboard/openMessage';

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Switch> */}
          <Route path='/' component={Dashboard} />

        {/* </Switch> */}
        
      </Router>
    
    </div>
  );
}

export default App;
