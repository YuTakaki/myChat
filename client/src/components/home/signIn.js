import React from 'react';
import logo from '../../assets/logochat.png';
import {Link} from 'react-router-dom';

const SignIn = (props) => {
    const login = (e) => {
        e.preventDefault();
        props.history.push('/messages');
    }
    return (  
        <>
            <form onSubmit={login}>
                <img src={logo} />
                <h2>Welcome to myChat</h2>
                <div>
                    <input id='username' type='text' placeholder=' '/>
                    <label htmlFor='username'>Username</label>
                </div>
                <div>
                    <input id='password' type='password' placeholder=' '/>
                    <label htmlFor='password'>Password</label>
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