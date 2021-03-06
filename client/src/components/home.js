import React, {useRef} from 'react';
import '../styles/home.scss';
import {HashRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Main from './home/main';
import Auth from './home/auth';

const Home = () => {
    const homeNav = useRef();
    const showHomeNav = () => {
        homeNav.current.classList.toggle('showHomeNav');
    }
    const closeHomeNav = () => {
        homeNav.current.classList.remove('showHomeNav');
    }
    return (
        <div className='home'>
            <header>
                <Link to='/home'><h1>myChat</h1></Link>
                <nav ref={homeNav}>
                    <ul>
                        <Link to='/home/sign-up'><li onClick={closeHomeNav}>Register</li></Link>
                        <Link to='/home/sign-in'><li onClick={closeHomeNav}>Log-in</li></Link>
                        {/* <Link to='/stranger'><li onClick={closeHomeNav}>Stranger</li></Link> */}
                    </ul>
                </nav>
                <i onClick={showHomeNav} className='fa fa-bars'></i>
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