import React, {useContext} from 'react';
import userLogo from '../../assets/yu.png';
import {Link} from 'react-router-dom';
import ClosingOpening from '../closing_opening_hoc';
import { USERDATA } from '../context/userData';
import axios from 'axios';

const MessageList = (props) => {
    const {user, user_dispatch} = useContext(USERDATA);
    console.log(user);
    const showMessageOption = (e, i) => {
        e.stopPropagation();
        document.querySelectorAll('.message-options').forEach((m, index) => index !== i && m.classList.remove('messageOptionActive'))
        e.target.nextSibling.classList.toggle('messageOptionActive');
    }

    const {openUserView2 }= props;
    const setDate = (date) => {
        const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
                        'Sept', 'Oct', 'Nov', 'Dec'];
        const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        date = new Date(date);
        const currentDate = new Date(Date.now());
        if(currentDate.getMonth() === date.getMonth() &&
            currentDate.getDate() === date.getDate() &&
            currentDate.getFullYear() === date.getFullYear()){
                let hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
                hour = hour <= 10 ? '0' + hour : hour;
                const minute = date.getMinutes() <= 10 ? '0' + date.getMinutes() : date.getMinutes();
                const am_pm = date.getHours() >= 12 ? 'pm' : 'am';
                return `${hour} : ${minute} ${am_pm}`

        }else if(currentDate.getMonth() === date.getMonth() &&
            currentDate.getFullYear() === date.getFullYear()&& 
            currentDate.getDate() - date.getDate() <= 6){
                return `${day[date.getDay()]}`

        }else{
            return `${month[date.getMonth()]} ${date.getDate()}`
        }
    }
    const inboxMessage = (e, user_id) => {
        e.stopPropagation();
        openUserView2();
        console.log(props);
        props.history.push(`/messages/${user_id}`)
    }

    const deleteMessage = (e, id) => {
        e.stopPropagation();
        axios.post(`/dashboard/deleteMessage/${user._id}`, {id})
            .then(res => {
                console.log(res.data);
                user_dispatch({type : 'USER', data : res.data});
                document.querySelectorAll('.message-options').forEach(m => m.classList.remove('messageOptionActive'));
            });
    }
    return ( 
        <div className='messageContainer'>
            {user.messages && user.messages.map((messages, i) => (
                <div className='messageContent' onClick={(e) => inboxMessage(e, messages.user_id)}>
                    <img src={messages.senderProfile === '' ? userLogo : messages.senderProfile}/>
                    <div className='activeIndicator activeIndicatorTrue'></div>
                    <div className={`message ${!messages.seen ? 'notSeen' : ''}`}>
                        <h4>{messages.username}</h4>
                        <p>{messages.messages[messages.messages.length - 1 ].message ? messages.messages[messages.messages.length - 1].message
                        : 'sent an image'}</p>
                    </div>
                    <div className='right'>
                        <p>{setDate(messages.date)}</p>
                        <i className='fa fa-ellipsis-h' onClick={(e) => showMessageOption(e, i)}></i>
                        <div className='message-options'>
                            <button onClick={(e) => deleteMessage(e, messages._id)}>Delete</button>
                        </div>
                    </div>
                </div>
            ))}
            {user.messages && user.messages.length === 0 && (
                <div>
                    <h3>No Messages</h3>
                </div>
            )}
        </div>

     );
}
 
export default ClosingOpening(MessageList);