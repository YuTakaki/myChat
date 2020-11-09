import React from 'react';
import logo from '../../assets/logochat.png';
import {Link} from 'react-router-dom';

const SignUp = (props) => {
    const signUp = (e) => {
        e.preventDefault();
        props.history.push('/messages');
    }
    return (  
        <>
            <form onSubmit={signUp}>
                <img src={logo} />
                <h2>Welcome to myChat</h2>
                <div className='name'>
                    <div>
                        <input id='First' type='text' placeholder=' '/>
                        <label htmlFor='First'>First Name</label>
                    </div>
                    <div>
                        <input id='Last' type='text' placeholder=' '/>
                        <label htmlFor='Last'>Last Name</label>
                    </div>

                </div>
                <div>
                    <input id='username' type='text' placeholder=' '/>
                    <label htmlFor='username'>Username</label>
                </div>
                <div>
                    <input id='password' type='password' placeholder=' '/>
                    <label htmlFor='password'>Password</label>
                </div>
                <div>
                    <input id='retry-password' type='password' placeholder=' '/>
                    <label htmlFor='retry-password'>Retry Password</label>
                </div>
                <input type='submit' value='Log-in' />
            </form>

            <div className='hasConfirmation'>
                <p>Already have an account? <Link to='/home/sign-in'>Sign-in</Link></p>
            </div>
        </>
    );
}
 
export default SignUp;