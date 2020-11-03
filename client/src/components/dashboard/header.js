import React from 'react';
import user from '../../assets/yu.jpg'

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
                    <li>
                        <i className='fa fa-envelope'></i>
                        <p>Messages</p>
                    </li>
                    <li>
                        <i className='fas fa-user-friends'></i>
                        <p>Friends</p>
                    </li>
                    <li>
                        <i className='fa fa-gear'></i>
                        <p>Settings</p>
                    </li>
                </ul>
                <input type='checkbox' />
            </nav>
        </header>
      );
}
 
export default Header;