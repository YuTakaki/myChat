import React, {useState, useContext} from 'react';
import logo from '../../assets/logochat.png';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { IS_LOGIN } from '../context/isLogin';

const SignIn = (props) => {
    const [loginInfo, setLoginInfo] = useState({
        username : '',
        password : ''
    });

    const [loginErr, setLoginErr] = useState({
        username_err : '',
        password_err: '',
    })

    const {islogin_dispatch} = useContext(IS_LOGIN);
    const login = (e) => {
        e.preventDefault();
        axios.post('/authentication/sign-in', loginInfo)
            .then(res => {
                if(typeof res.data === 'string'){
                    islogin_dispatch({type : 'SET_ISLOGIN', data : res.data});
                    props.history.push('/messages');
                }else{
                    console.log(res.data)
                    setLoginErr({
                        ...loginErr,
                        ...res.data
                    });

                };
                

            })
    }

    const setSigninInfo = (key, value) => {
        setLoginInfo({
            ...loginInfo,
            [key] : value
        })
    }
    return (  
        <>
            <form onSubmit={login}>
                <img src={logo} />
                <h2>Welcome to myChat</h2>
                <div>
                    <input onChange={(e) => setSigninInfo('username', e.target.value)} id='username' type='text' placeholder=' ' required={true}/>
                    <label htmlFor='username'>Username or email</label>
                    <p>{loginErr.username_err}</p>
                </div>
                <div>
                    <input onChange={(e) => setSigninInfo('password', e.target.value)}  id='password' type='password' placeholder=' ' required={true}/>
                    <label htmlFor='password'>Password</label>
                    <p>{loginErr.password_err}</p>
                </div>
                <input type='submit' value='Log-in' />
            </form>

            <div className='hasConfirmation'>
                <p>Don't have an account? <Link to='/home/sign-up'>Sign-up</Link></p>
            </div>
        </>
    );
}
 
export default SignIn;