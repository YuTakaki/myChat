import React from 'react';
import {Link} from 'react-router-dom';
import ClosingOpening from '../closing_opening_hoc';

const Settings = (props) => {
    const {openUserView2}= props
    return ( 
        <div className='settings'>
            <h2>Settings</h2>
            <ul>
                <Link to='/settings/personal-info'><li onClick={openUserView2}> 
                    <i  className='fa fa-info-circle'></i>
                    <h3>Personal Information</h3>
                </li></Link>
                <Link to='/settings/profile-picture'><li onClick={openUserView2}> 
                    <i  className='fa fa-camera'></i>
                    <h3>Profile Picture</h3>
                </li></Link>
                <Link to='/settings/delete-account'><li onClick={openUserView2}> 
                    <i  className='fa fa-trash'></i>
                    <h3>Delete Account</h3>
                </li></Link>
            </ul>
        </div>
     );
}
 
export default ClosingOpening(Settings);