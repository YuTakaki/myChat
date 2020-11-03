import React from 'react';
import '../../styles/dashboard.scss';
import Header from './header';
import Search from './search';


const Dashboard = () => {

    
    return ( 
        <div className='dashboard'>
            <Header />
            <div className='userView1'>
                <Search />
                
                <div className='messageContainer'>
                    <div className='messageContent'>
                        <img />
                        <div className='message'>
                            <h4>Yu Takaki</h4>
                            <p>bakit ba ikaw na ang</p>
                        </div>
                    </div>

                </div>
            </div>
            <div className='userView2'>

            </div>
        </div>
     );
}
 
export default Dashboard;