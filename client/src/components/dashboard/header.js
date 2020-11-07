import React from 'react';
import user from '../../assets/yu.jpg';
import {Link} from 'react-router-dom';

const Header = () => {
    const hideMenu = () => {
        document.querySelector('header').classList.remove('showHeader');
        document.querySelector('.userView1').classList.remove('viewHide');
    }
    return (
        <header>
            <img src={user}/>
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
                <input type='checkbox' />
            </nav>
        </header>
      );
}
 
export default Header;