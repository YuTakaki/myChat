import React, {useEffect, useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import userLogo from '../../assets/yu.jpg';
import ClosingOpening from '../closing_opening_hoc';
import axios from 'axios';
import { IS_LOGIN } from '../context/isLogin';
import { USERDATA } from '../context/userData';

const ContactProfile = (props) => {

    const {closeUserView2} = props;
    const {islogin} = useContext(IS_LOGIN);
    const {user, user_dispatch} = useContext(USERDATA);

    const [contactProfile, setContactProfile] = useState({});
    useEffect(() => {
        axios.get(`/dashboard/user2/${props.match.params.username}`)
            .then(res => {
                setContactProfile(res.data);
            })
    }, []);

    useEffect(() => {
        console.log(contactProfile);
    }, [contactProfile]);

    const addToContact = () => {
        axios.post(`/dashboard/addToContact/${islogin.id}`, {username : contactProfile.username, _id : contactProfile._id})
            .then(res => {
                user_dispatch({type : 'USER', data : res.data});
            });
    }
    const deleteToContact = () => {
        axios.post(`/dashboard/deleteToContact/${islogin.id}`, {username : contactProfile.username})
            .then(res => {
                user_dispatch({type : 'USER', data : res.data});
            });
    }
    
    return (
        <div className='contactProfile'>
            <Link to='/contacts'><i className='fa fa-angle-left' onClick={closeUserView2}></i></Link>
            <img src={userLogo}/>
            <h1>Yu Takaki</h1>
            <div className='messageOption'>
                <ul>
                    <Link to={`/messages/${contactProfile.username && contactProfile.username}`}><li className='fa fa-envelope'></li></Link>
                    {user.contacts && user.contacts.every(contact => contact.username !== contactProfile.username) ? 
                    (
                        <li onClick={addToContact} className='fa fa-user-plus'></li>
                    ) : (
                        <li onClick={deleteToContact} className='fas fa-user-minus'></li>

                    )}
                    
                    {/* <Link><li className='fa fa-video'></li></Link> */}
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
 
export default ClosingOpening(ContactProfile);