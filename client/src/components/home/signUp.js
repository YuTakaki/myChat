import React, {useState, useEffect, useCallback, useContext} from 'react';
import logo from '../../assets/logochat.png';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { IS_LOGIN } from '../context/isLogin';

const SignUp = (props) => {
    const [registerInfo, setRegisterInfo] = useState({
        firstName : '',
        lastName: '',
        email : '',
        username : '',
        password: '',
        retry_password: ''
    });
    const [registerErr, setRegisterErr] = useState({
        username_err : '',
        email_err : '',
        password_err : '',
        retry_password_err : ''
    });

    const {islogin_dispatch} = useContext(IS_LOGIN);
    const signUp = (e) => {
        e.preventDefault();
        axios.post('/authentication/sign-up', registerInfo)
            .then(res => {
                if(res.data.hasOwnProperty('username_err')){
                    setRegisterErr(res.data)
                }else{
                    // setRegisterErr({
                    //     username_err : '',
                    //     email_err : '',
                    //     password_err : '',
                    //     retry_password_err : ''
                    // })
                    islogin_dispatch({type : 'SET_ISLOGIN', data : res.data._id});
                    props.history.push('/');
                }
            });
        
    };

    const setInfo = useCallback((key, value) => {
        setRegisterInfo({
            ...registerInfo,
            [key] : value,
        })
    }, [registerInfo]);

    return (  
        <>
            <form onSubmit={signUp}>
                <img src={logo} />
                <h2>Welcome to myChat</h2>
                <div className='name'>
                    <div>
                        <input autoComplete="off" onChange={(e) => setInfo('firstName', e.target.value)} id='First' type='text' placeholder=' ' required={true}/>
                        <label htmlFor='First'>First Name</label>
                    </div>
                    
                    <div>
                        <input autoComplete="off" onChange={(e) => setInfo('lastName', e.target.value)} id='Last' type='text' placeholder=' ' required={true}/>
                        <label htmlFor='Last'>Last Name</label>
                    </div>

                </div>
                <div>
                    <input autoComplete="off" onChange={(e) => setInfo('username', e.target.value)} id='username' type='text' placeholder=' ' required={true}/>
                    <label htmlFor='username'>Username</label>
                    <p>{registerErr.username_err}</p>
                </div>
                <div>
                    <input autoComplete="off" onChange={(e) => setInfo('email', e.target.value)} id='email' type='email' placeholder=' ' required={true}/>
                    <label htmlFor='email'>Email</label>
                    <p>{registerErr.email_err}</p>
                </div>
                <div>
                    <input autoComplete="off" onChange={(e) => setInfo('password', e.target.value)} id='password' type='password' placeholder=' ' required={true}/>
                    <label htmlFor='password'>Password</label>
                    <p>{registerErr.password_err}</p>
                </div>
                <div>
                    <input autoComplete="off" onChange={(e) => setInfo('retry_password', e.target.value)} id='retry-password' type='password' placeholder=' ' required={true}/>
                    <label htmlFor='retry-password'>Retry Password</label>
                    <p>{registerErr.retry_password_err}</p>
                </div>
                <input type='submit' value='register' />
            </form>

            <div className='hasConfirmation'>
                <p>Already have an account? <Link to='/home/sign-in'>Sign-in</Link></p>
            </div>
        </>
    );
}
 
export default SignUp;