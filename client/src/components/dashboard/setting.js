import React from 'react';
import {Link} from 'react-router-dom';

const Settings = () => {
    const openUserView2= (e) => {
        document.querySelector('.userView1').classList.add('viewHide');
        document.querySelector('.userView2').classList.add('userView2Open');
    }
    return ( 
        <div className='settings'>
            <h2>Settings</h2>
            <ul>
                <Link to='/settings/personal-info'><li onClick={openUserView2}> 
                    <i  className='fa fa-info-circle'></i>
                    <h3>Personal Information</h3>
                </li></Link>
            </ul>
        </div>
     );
}
 
export default Settings;