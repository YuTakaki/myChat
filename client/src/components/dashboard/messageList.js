import React from 'react';
import user from '../../assets/yu.jpg';

const MessageList = () => {
    const showMessageOption = (e) => {
        e.stopPropagation();
        // document.querySelectorAll('.message-options').forEach(m => m.classList.remove('messageOptionActive'))
        e.target.nextSibling.classList.toggle('messageOptionActive');
    }

    const openUserView2= (e) => {
        document.querySelector('.userView1').classList.add('viewHide');
        document.querySelector('.userView2').classList.add('userView2Open');
    }
    return ( 
        <div className='messageContainer'>
            <div className='messageContent' onClick={openUserView2}>
                <img src={user}/>
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
                <div>
                    <p>june 18</p>
                    <i className='fa fa-ellipsis-h' onClick={showMessageOption}></i>
                    <div className='message-options'>
                        <button>Delete</button>
                    </div>
                </div>
            </div>
        </div>

     );
}
 
export default MessageList;