import React, {useEffect, useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import userLogo from '../../assets/yu.png';
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
        
    }, []);

    useEffect(()=>{
        if(props.match.params.id && props.match.params.id !== contactProfile._id){
            axios.get(`/dashboard/user/${props.match.params.id}`)
                .then(res => {
                    setContactProfile(res.data);
                })

        }
    })

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
            <img src={!user.profile ? userLogo : user.profile}/>
            <h1>{contactProfile.firstName} {contactProfile.lastName}</h1>
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
                        <h4>{contactProfile.firstName} {contactProfile.lastName}</h4>
                        <p>Name</p>
                    </li>
                    <li>
                        <h4>{contactProfile.username}</h4>
                        <p>Username</p>
                    </li>
                    <li>
                        <h4>{contactProfile.bio}</h4>
                        <p>Bio</p>
                    </li>
                    <li>
                        <h4>{contactProfile.email}</h4>
                        <p>Email</p>
                    </li>
                </ul>
            </div>

        </div>
     );
}
 
export default ClosingOpening(ContactProfile);