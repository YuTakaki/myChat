import React from 'react';
import '../styles/home.scss';
import {HashRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Main from './home/main';
import SignIn from './home/signIn';
import Auth from './home/auth';

const Home = () => {
    return (
        
        <div className='home'>
            <header>
                <Link to='/home'><h1>myChat</h1></Link>
                <nav>
                    <ul>
                        <li>Register</li>
                        <li>Stranger</li>
                        <li>Sign-in</li>
                    </ul>
                </nav>
            </header>
            <Router>
                <Switch>
                    <Route exact path='/home' component={Main}/>
                    <Route path='/home/sign-in' component={Auth}/>
                    <Route path='/home/sign-up' component={Auth}/>
                </Switch>
            </Router>
            
        </div>
        
     );
}
 
export default Home;