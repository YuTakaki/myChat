import React, {useContext, useRef, useState} from 'react';
import ClosingOpening from '../closing_opening_hoc';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { USERDATA } from '../context/userData';

const ChangePassword = ({closeUserView2}) => {
    const {user, user_dispatch} = useContext(USERDATA); 
    const [message, setMessage] = useState('');
    const currentPassword = useRef();
    const newPassword = useRef();
    const retryNewPassword = useRef();
    const changePassword = (e) => {
        e.preventDefault();
        if(newPassword.current.value === retryNewPassword.current.value){
            axios.put(`/dashboard/change-password/${user._id}`, {
                currentPassword : currentPassword.current.value,
                newPassword : newPassword.current.value,
            })
                .then(res => {
                    if(res.data){
                        user_dispatch({type : 'USER', data : res.data});
                        currentPassword.current.value = '';
                        newPassword.current.value = '';
                        retryNewPassword.current.value = '';
                        setMessage('change password success');
                    }else{
                        setMessage('wrong input current password');
                    } 
                });
        }else{
            setMessage('retry password doesn\'t match the new password');
            
        }
        
        
    }
    return ( 
        <div className='changePassword'>
            <Link to='/settings'><i className='fa fa-angle-left' onClick={closeUserView2}></i></Link>
            <form onSubmit={changePassword}>
                <h3>Change Password</h3>
                <input type='password' ref={currentPassword} required={true} placeholder='current password'/>
                <input type='password' ref={newPassword} required={true} placeholder='new password'/>
                <input type='password' ref={retryNewPassword} required={true} placeholder='retry new password'/>
                <input type='submit'/>
                <h3>{message}</h3>

            </form>

        </div>
     );
}
 
export default ClosingOpening(ChangePassword);