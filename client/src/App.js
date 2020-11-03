import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom'
import Dashboard from './components/dashboard/dashboard';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path='/' component={Dashboard} />

      </Router>
    
    </div>
  );
}

export default App;
