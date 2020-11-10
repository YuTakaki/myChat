import React from 'react';
import '../../styles/stranger.scss';
import {Link} from 'react-router-dom';

const StrangerDashboard = () => {
    return ( 
        <div className='stranger'>
            <header>
                <Link to='/home'><h1>myChat <span>Stranger</span> not available yet</h1></Link>
            </header>

        </div>
     );
}
 
export default StrangerDashboard;