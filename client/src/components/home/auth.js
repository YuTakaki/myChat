import React from 'react';
import {HashRouter as Router, Route, Switch, Link} from 'react-router-dom';
import SignIn from './signIn';
import SignUp from './signUp';

const Auth = () => {
    return (  
        <div className='auth'>
            <Router>
                <Switch>
                    <Route path='/home/sign-in' component={SignIn} />
                    <Route path='/home/sign-up' component={SignUp} />
                </Switch>
            </Router>

            
            

        </div>
    );
}
 
export default Auth;