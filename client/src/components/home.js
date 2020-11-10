import React from 'react';
import '../styles/home.scss';
import {HashRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Main from './home/main';
import Auth from './home/auth';

const Home = () => {
    return (
        
        <div className='home'>
            <header>
                <Link to='/home'><h1>myChat</h1></Link>
                <nav>
                    <ul>
                        <Link to='/home/sign-up'><li>Register</li></Link>
                        <Link to='/home/sign-in'><li>Log-in</li></Link>
                        <Link to='/stranger'><li>Stranger</li></Link>
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