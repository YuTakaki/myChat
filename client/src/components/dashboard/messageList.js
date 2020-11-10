import React from 'react';
import user from '../../assets/yu.jpg';
import {Link} from 'react-router-dom';
import ClosingOpening from '../closing_opening_hoc';

const MessageList = (props) => {
    const showMessageOption = (e) => {
        e.stopPropagation();
        // document.querySelectorAll('.message-options').forEach(m => m.classList.remove('messageOptionActive'))
        e.target.nextSibling.classList.toggle('messageOptionActive');
    }

    const {openUserView2 }= props
    return ( 
        <div className='messageContainer'>

            <Link to='/messages/asd'><div className='messageContent' onClick={openUserView2}>
                <img src={user}/>
                <div className='activeIndicator activeIndicatorTrue'></div>
                <div className='message'>
                    <h4>Yu Takaki</h4>
                    <p>bakit ba ikaw na ang
                    bakit ba ikaw na ang
                    bakit ba ikaw na ang
                    bakit ba ikaw na ang
                    bakit ba ikaw na ang
                    bakit ba ikaw na ang
                    bakit ba ikaw na ang
                    userView1bakit ba ikaw na ang
                    bakit ba ikaw na ang</p>
                </div>
                <div className='right'>
                    <p>june 18</p>
                    <i className='fa fa-ellipsis-h' onClick={showMessageOption}></i>
                    <div className='message-options'>
                        <button>Delete</button>
                    </div>
                </div>
            </div></Link>
        </div>

     );
}
 
export default ClosingOpening(MessageList);