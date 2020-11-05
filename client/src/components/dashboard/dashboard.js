import React from 'react';
import '../../styles/dashboard.scss';
import Header from './header';
import Search from './search';
import MessageList from './messageList';
import OpenMessage from './openMessage';
import {HashRouter as Router, Route} from 'react-router-dom';

const Dashboard = () => {

    return ( 
        <div className='dashboard'>
            <Header />
            <div className='userView1'>
                <Search />
                <Router>
                    <Route path='/message' component={MessageList} />
                </Router>        
            </div>
            <div className='userView2'>
                <Router>
                    <Route exact path='/message/:id' component={OpenMessage} />
                </Router>  
                

            </div>
        </div>
     );
}
 
export default Dashboard;