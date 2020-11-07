import React from 'react';
import {Link} from 'react-router-dom';
import user from '../../assets/yu.jpg';

const ContactProfile = () => {

    const closeUserView2 = () => {
        document.querySelector('.userView1').classList.remove('viewHide');
        document.querySelector('.userView2').classList.remove('userView2Open');
    }
    
    return (
        <div className='contactProfile'>
            <Link to='/contacts'><i className='fa fa-angle-left' onClick={closeUserView2}></i></Link>
            <img src={user}/>
            <h1>Yu Takaki</h1>
            <div className='messageOption'>
                <ul>
                    <Link to='/messages/sa'><li className='fa fa-envelope'></li></Link>
                    <Link><li className='fa fa-phone'></li></Link>
                    <Link><li className='fa fa-video'></li></Link>
                </ul>
            </div>
            <div className='userInfo'>
                <h2>info</h2>
                <ul>
                    <li>
                        <h4>Yu</h4>
                        <p>Username</p>
                    </li>
                    <li>
                        <h4>asdasdd</h4>
                        <p>Bio</p>
                    </li>
                    <li>
                        <h4>yu%adasd.com</h4>
                        <p>Email</p>
                    </li>
                    <li>
                        <h4>june02 2000</h4>
                        <p>Birthday</p>
                    </li>
                </ul>
            </div>

        </div>
     );
}
 
export default ContactProfile;