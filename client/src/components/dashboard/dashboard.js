import React from 'react';
import '../../styles/dashboard.scss';
import Header from './header';
import Search from './search';
import MessageList from './messageList';
import OpenMessage from './openMessage';

const Dashboard = () => {

    return ( 
        <div className='dashboard'>
            <Header />
            <div className='userView1'>
                <Search />
                <MessageList />
                
                
                
            </div>
            <div className='userView2'>
                <OpenMessage />
                

            </div>
        </div>
     );
}
 
export default Dashboard;