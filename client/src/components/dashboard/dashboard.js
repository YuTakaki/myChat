import React, {useContext, useEffect} from 'react';
import '../../styles/dashboard.scss';
import Header from './header';
import Search from './search';
import MessageList from './messageList';
import OpenMessage from './openMessage';
import {HashRouter as Router, Route, Redirect} from 'react-router-dom';
import ContactList from './contactList';
import ContactProfile from './contactProfile';
import Settings from './setting';
import PersonalInfo from './personal_info';
import { IS_LOGIN } from '../context/isLogin';
import axios from 'axios';
import { USERDATA } from '../context/userData';
import {socket} from '../socket';

const Dashboard = () => {

    const {islogin} = useContext(IS_LOGIN);
    const {user_dispatch} = useContext(USERDATA);
    
    useEffect(()=>{
        socket.open();
        
        axios.get(`/dashboard/user/${islogin.id}`)
            .then(res => {
                user_dispatch({type : 'USER', data : res.data});
                axios.get('/authentication/online/' + islogin.id);
            });
    },[]);
    window.addEventListener('beforeunload', () => {
        axios.get('/autheication/offline/' + islogin.id);
    });

    return ( 
        
        <div className='dashboard'>
        {!islogin.isLogin ? (<Redirect to='/home'/>) : (<Redirect to='/messages'/>)}
            <Header />
            <div className='userView1'>
                <Search />
                <Router>
                    <Route path='/messages' component={MessageList} />
                    <Route path='/contacts' component={ContactList} />
                    <Route path='/settings' component={Settings} />
                </Router>        
            </div>
            <div className='userView2'>
                <Router>
                    <Route exact path='/messages/:id' component={OpenMessage} />
                    <Route path='/contacts/:id' component={ContactProfile} />
                    <Route path='/settings/personal-info' component={PersonalInfo} />
                </Router> 
            </div>
        </div>
     );
}
 
export default React.memo(Dashboard);