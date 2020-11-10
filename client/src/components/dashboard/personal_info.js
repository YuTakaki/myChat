import React from 'react';
import {Link} from 'react-router-dom';
import ClosingOpening from '../closing_opening_hoc';

const PersonalInfo = (props) => {
    const {closeUserView2} = props
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
 
export default ClosingOpening(PersonalInfo);