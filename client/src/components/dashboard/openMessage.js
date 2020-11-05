import React, {useRef, useEffect} from 'react';
import user from '../../assets/yu.jpg';

const OpenMessage = () => {
    const closeUserView2 = () => {
        document.querySelector('.userView1').classList.remove('viewHide');
        document.querySelector('.userView2').classList.remove('userView2Open');
    }

    const chat = useRef();
    useEffect(() => {
        chat.current.scrollTop = chat.current.scrollHeight;
    });
    
    
    return ( 
        <>
            <div className='chatHeader'>
                <i className='fa fa-angle-left' onClick={closeUserView2}></i>
                <img src={user} />
                <h4>Yu Takaki</h4>

            </div>
            <div className='chat' ref={chat}>
                <div className='chat-content'>
                    <img src={user}/>
                    <div className='chat-message'>
                        <p>components\dashboard\openMessage.js
[1]   Line 13:17:  img elements must have an alt prop, either with meaningful text, or an empty string for decorative images  jsx-a11y/alt-text
[1]   Line 19:21:  img elements must have an alt prop, either with meaningful text, or an empty string for d</p>
                    </div>
                    <p>12:20am</p>
                </div>

                <div className='chat-content userMessage'>
                    <img src={user}/>
                    <div className='chat-message'>
                        <p>hi</p>
                    </div>
                    <p>12:20am</p>
                </div>
                <div className='chat-content'>
                    <img src={user}/>
                    <div className='chat-message'>
                        <p>components\dashboard\openMessage.js
[1]   Line 13:17:  img elements must have an alt prop, either with meaningful text, or an empty string for decorative images  jsx-a11y/alt-text
[1]   Line 19:21:  img elements must have an alt prop, either with meaningful text, or an empty string for d</p>
                    </div>
                    <p>12:20am</p>
                </div>

                <div className='chat-content userMessage'>
                    <img src={user}/>
                    <div className='chat-message'>
                        <p>hi</p>
                    </div>
                    <p>12:20am</p>
                </div>
                <div className='chat-content'>
                    <img src={user}/>
                    <div className='chat-message'>
                        <p>components\dashboard\openMessage.js
[1]   Line 13:17:  img elements must have an alt prop, either with meaningful text, or an empty string for decorative images  jsx-a11y/alt-text
[1]   Line 19:21:  img elements must have an alt prop, either with meaningful text, or an empty string for d</p>
                    </div>
                    <p>12:20am</p>
                </div>

                <div className='chat-content userMessage'>
                    <img src={user}/>
                    <div className='chat-message'>
                        <p>hi</p>
                    </div>
                    <p>12:20am</p>
                </div>
                <div className='chat-content'>
                    <img src={user}/>
                    <div className='chat-message'>
                        <p>components\dashboard\openMessage.js
[1]   Line 13:17:  img elements must have an alt prop, either with meaningful text, or an empty string for decorative images  jsx-a11y/alt-text
[1]   Line 19:21:  img elements must have an alt prop, either with meaningful text, or an empty string for d</p>
                    </div>
                    <p>12:20am</p>
                </div>

                <div className='chat-content userMessage'>
                    <img src={user}/>
                    <div className='chat-message'>
                        <p>must have an alt prop, either with meaningful text, or an empty string for decorative images  jsx-a11y/alt-text
  Line 88:21:  img elements must have an alt prop, either with meaningful text, or an empty string for decorative images  jsx-a11y/alt-text
overrideMethod @ react_devtools_backend.js:2450
printWarnings @ webpackHotDevClient.js:138
handleWarnings @ webpackHotDevClient.js:143
push../node_modules/react-dev-utils/webpackHotDevClient.js.connection.onmessage @ webpackHotDevClient.js:210
openMessage.js:13 hi
2react_devtools_backend.js:2450 src\components\dashboard\header.js
  Line 11:13:  img elements must have an alt prop, either with meaningful text, or an empty string for decorative images  jsx-a11y/alt-text

src\components\dashboard\messageList.js
  Line 18:17:  img elements must have an alt prop, either with meaningful text, or an empty string for decorative images  jsx-a11y/alt-text

src\components\dashboard\openMessage.js
  Line 20:17:  img elements must have an alt prop, either with meaningful text, or an empty string for decorative images  jsx-a11y/alt-text
  Line 26:21:  img elements must have an alt prop, either with meaningful text, or an empty string for decorative images  jsx-a11y/alt-text
  Line 36:21:  img elements must have an alt prop, either with meaningful text, or an empty string for decorative images  jsx-a11y/alt-text
  Line 43:21:  img elements must have an alt prop, either with meaningful text, or an empty string for decorative images  jsx-a11y/alt-text
  Line 53:21:  img elements must have an alt prop, either with meaningful text, or an empty string for decorative images  jsx-a11y/alt-text
  Line 60:21:  img elements must have an alt prop, either with meaningful text, or an empty string for decorative images  jsx-a11y/alt-text
  Line 70:21:  img elements must have an alt prop, either with meaningful text, or an empty string for decorative images  jsx-a11y/alt-text
  Line 77:21:  img elements must have an alt prop, either with meaningful text, or an empty string for decorative images  jsx-a11y/alt-text
  Line 87:21:  img elements must have an alt prop, either with meaningful text, or an empty string for decorative images  jsx-a11y/alt-text</p>
                    </div>
                    <p>12:20am</p>
                </div>

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