import React, {useContext, useState, useRef} from 'react';
import {Link} from 'react-router-dom';
import ClosingOpening from '../closing_opening_hoc';
import { USERDATA } from '../context/userData';
import axios from 'axios';

const PersonalInfo = (props) => {
    
    const {user, user_dispatch} = useContext(USERDATA);
    const [userInfo, setUserInfo] = useState({
        firstName : user.firstName,
        lastName : user.lastName,
        username : user.username,
        email : user.email,
        bio : user.bio
    });
    const [inputErr, setInputErr] = useState({
        username_err : '',
        email_err : '',
    });

    const [success_err, setSuccess_err] = useState({
        msg : '',
        style : {
            color : 'green'
        }
    });
    const retryPasswordInput = useRef();
    const {closeUserView2} = props;
    const edit = (e) => {
        e.target.previousSibling.disabled = false;
        e.target.previousSibling.focus();
        
    }
    const editProfile = (e) => {
        e.preventDefault();
        console.log(userInfo);
        axios.post(`/dashboard/editAccount?userUsername=${user.username}&userEmail=${user.email}`, userInfo)
        
        .then(res => {
            console.log(res.data);
            if(res.data.hasOwnProperty('username_err')){
                setInputErr(res.data);
                setSuccess_err({
                    msg : 'error occured',
                    style : {
                        color : 'red'
                    }
                });
            }else{
                user_dispatch({type : 'USER', data : res.data});
                setUserInfo({
                    firstName : user.firstName,
                    lastName : user.lastName,
                    username : user.username,
                    email : user.email,
                    bio : user.bio
                });
                setInputErr({
                    username_err : '',
                    email_err : '',
                });
                setSuccess_err({
                    msg : 'update successful',
                    style : {
                        color : 'green'
                    }
                });
            };
        });
        e.target.children[1].children[0].value = ''
    }
    const retryInput = (e) => {
        edit(e)
        retryPasswordInput.current.disabled = false;
    }

    return ( 
        <div className='personalInfo'>
        <Link to='/settings'><i className='fa fa-angle-left' onClick={closeUserView2}></i></Link>
            <h2>Personal Information</h2>
            <div className='form'>
                <form onSubmit={editProfile}>
                    <p>First Name</p>
                    <div className='inputContainer'>
                        <input onChange={(e) => setUserInfo({...userInfo, firstName : e.target.value})} 
                        type='text' placeholder={user.firstName} disabled={true} required={true}/>
                        <i onClick={edit} className='fa fa-pencil'></i>
                    </div>
                    <p className='error'></p>
                    
                    
                </form>
                <form onSubmit={editProfile}>
                    <p>Last Name</p>
                    <div className='inputContainer'>
                        <input type='text' onChange={(e) => setUserInfo({...userInfo, lastName : e.target.value})}
                        placeholder={user.lastName} disabled={true} required={true}/>
                        <i onClick={edit} className='fa fa-pencil'></i>
                    </div>
                    <p className='error'></p>    
                </form>
                <form onSubmit={editProfile}>
                    <p>Username</p>
                    <div className='inputContainer'>
                        <input type='text' onChange={(e) => setUserInfo({...userInfo, username : e.target.value})}
                        placeholder={user.username} disabled={true} required={true} />
                        <i onClick={edit} className='fa fa-pencil'></i>
                    </div>
                    <p className='error'>{inputErr.username_err}</p>
                    
                </form>
                <form onSubmit={editProfile}>
                    <p>Bio</p>
                    <div className='inputContainer'>
                        <input type='text' onChange={(e) => setUserInfo({...userInfo, bio : e.target.value})}
                        placeholder={user.username} disabled={true} required={true}/>
                        <i onClick={edit} className='fa fa-pencil'></i>
                    </div>
                    <p className='error'></p>
                    
                </form>
                <form onSubmit={editProfile}>
                    <p>Email</p>
                    <div className='inputContainer'>
                        <input type='text' onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                        placeholder={user.email} disabled={true} required={true} />
                        <i onClick={edit} className='fa fa-pencil'></i>
                    </div>
                    <p className='error'>{inputErr.email_err}</p>
                    
                </form>
            </div>
            <p style={success_err.style}> {success_err.msg}</p>
        </div>
     );
}
 
export default ClosingOpening(PersonalInfo);