import React from 'react';
import user from '../../assets/yu.jpg';

const OpenMessage = () => {
    const closeUserView2 = () => {
        document.querySelector('.userView1').classList.remove('viewHide');
        document.querySelector('.userView2').classList.remove('userView2Open');
    }
    return ( 
        <>
            <div className='chatHeader'>
                <i className='fa fa-angle-left' onClick={closeUserView2}></i>
                <img src={user} />
                <h4>Yu Takaki</h4>

            </div>
            <div className='chat'>

            </div>
            <div className='chat-input'>
                <form>
                    <label htmlFor='file' className='fa fa-image'>

                        
                    </label>
                    <input id='file' type='file' />
                    <textarea placeholder='message'/>
                    <button type='submit' className='fa fa-send' value=''/>
                </form>
                
            </div>
        </>
     );
}
 
export default OpenMessage;