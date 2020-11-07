import React from 'react';
import {Link} from 'react-router-dom'

const PersonalInfo = () => {
    const closeUserView2 = () => {
        document.querySelector('.userView1').classList.remove('viewHide');
        document.querySelector('.userView2').classList.remove('userView2Open');
    }
    return ( 
        <div className='personalInfo'>
        <Link to='/settings'><i className='fa fa-angle-left' onClick={closeUserView2}></i></Link>
            <h2>Personal Information</h2>
            <form>
                <label>
                    <p>Username</p>
                    <input type='text' defaultValue='yuTakaki' />
                    
                </label>
                <label>
                    <p>Username</p>
                    <input type='text' defaultValue='yuTakaki' />
                    
                </label>
                <label>
                    <p>Username</p>
                    <input type='text' defaultValue='yuTakaki' />
                </label>
            </form>
        </div>
     );
}
 
export default PersonalInfo;