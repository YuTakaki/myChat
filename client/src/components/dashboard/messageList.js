import React, {useContext} from 'react';
import userLogo from '../../assets/yu.png';
import {Link} from 'react-router-dom';
import ClosingOpening from '../closing_opening_hoc';
import { USERDATA } from '../context/userData';

const MessageList = (props) => {
    const {user} = useContext(USERDATA);
    console.log(user);
    const showMessageOption = (e) => {
        e.stopPropagation();
        // document.querySelectorAll('.message-options').forEach(m => m.classList.remove('messageOptionActive'))
        e.target.nextSibling.classList.toggle('messageOptionActive');
    }

    const {openUserView2 }= props;
    return ( 
        <div className='messageContainer'>
            {user.messages && user.messages.map(messages => (
                <Link to={`/messages/${messages.user_id}`}><div className='messageContent' onClick={openUserView2}>
                    <img src={userLogo}/>
                    <div className='activeIndicator activeIndicatorTrue'></div>
                    <div className='message'>
                        <h4>{messages.username}</h4>
                        <p>{messages.messages[messages.messages.length - 1 ].message ? messages.messages[messages.messages.length - 1].message
                        : 'sent an image'}</p>
                    </div>
                    <div className='right'>
                        <p>june 18</p>
                        <i className='fa fa-ellipsis-h' onClick={showMessageOption}></i>
                        <div className='message-options'>
                            <button>Delete</button>
                        </div>
                    </div>
                </div></Link>
            ))}
        </div>

     );
}
 
export default ClosingOpening(MessageList);