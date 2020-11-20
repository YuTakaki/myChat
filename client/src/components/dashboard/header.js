import React, {useContext} from 'react';
import userLogo from '../../assets/yu.png';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { IS_LOGIN } from '../context/isLogin';
import { USERDATA } from '../context/userData';


const Header = () => {
    const {islogin, islogin_dispatch} = useContext(IS_LOGIN);
    const {user} = useContext(USERDATA);
    const hideMenu = () => {
        document.querySelector('header').classList.remove('showHeader');
        document.querySelector('.userView1').classList.remove('viewHide');
    }
    const logout = () => {
        axios.get('/authentication/sign-out')
            .then(res => {
                axios.get('/authentication/offline/' + islogin.id);
                islogin_dispatch({type : 'LOGOUT'});
                
            });

    }
    return (
        <header>
            <img src={!user.profile ? userLogo : user.profile}/>
            <i className='fa fa-angle-left' onClick={hideMenu}></i>
            <nav className='userNav'>
                <ul>
                    <Link to='/messages'><li onClick={hideMenu}>
                        <i className='fa fa-envelope'></i>
                        <p>Messages</p>
                    </li></Link>
                    <Link to='/contacts'><li onClick={hideMenu}>
                        <i className='fas fa-user-friends'></i>
                        <p>Contacts</p>
                    </li></Link>

                    <Link to='/settings'><li onClick={hideMenu}>
                        <i className='fa fa-gear'></i>
                        <p>Settings</p>
                    </li></Link>
                </ul>
                <button onClick={logout}>Log-out</button>
            </nav>
        </header>
      );
}
 
export default Header;