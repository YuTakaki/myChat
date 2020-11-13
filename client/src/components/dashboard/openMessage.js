import React, {useRef, useEffect, useState, memo, useContext} from 'react';
import userLogo from '../../assets/yu.jpg';
import {Link} from 'react-router-dom';
import ClosingOpening from '../closing_opening_hoc';
import axios from 'axios';
import io from 'socket.io-client';
import { USERDATA } from '../context/userData';

const socket = io.connect();



const OpenMessage = (props) => {
    const {closeUserView2} = props;
    const {user} = useContext(USERDATA);
    
    
    const chat = useRef();
    const [userInfo, setUserInfo] = useState({});
    const [room, setRoom] = useState('');
    useEffect(() => {
        console.log('ji')
        chat.current.scrollTop = chat.current.scrollHeight;
        
        socket.on('send', (user) => {
            console.log(user);
        });

        
    }, []);

    useEffect(() => {
        if(props.match.params.id !== userInfo._id){
            axios.get(`/dashboard/user/${props.match.params.id}`)
                .then(res => {
                    setUserInfo(res.data);
                    const userData = res.data;
                    const room = userData.messages.filter(messageUser => messageUser.username === user.username)[0]._id;
                    setRoom(room);
                    console.log(room);
                    socket.emit('connectToUser', room);
                })
        }
    })
    useEffect(() => {
        
    }, [userInfo]);

    const messageInput = useRef()

    const sendMessage = (e) => {
        e.preventDefault()
        const send = {
            message : messageInput.current.value,
            sender : user.username,
            username : userInfo.username,
            room
        }
        socket.emit('sendMessage', send)
        messageInput.current.value = ''
    };
    return ( 
        <>
            <div className='chatHeader'>
                <Link to='/messages'><i className='fa fa-angle-left' onClick={closeUserView2}></i></Link>
                <Link to={userInfo._id && `/contacts/${userInfo._id}`}><img src={userLogo} /></Link>
                <div className='activeIndicator activeIndicatorTrue'></div>
                <h4>{userInfo.username}</h4>

            </div>
            <div className='chat' ref={chat}>
                {/* <div className='chat-content'>
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
                </div> */}

            </div>
            <div className='chat-input'>
                <form  onSubmit={sendMessage}>
                    <label htmlFor='file' className='fa fa-image'>
                    </label>
                    <input id='file' type='file' />
                    <textarea ref={messageInput} placeholder='message'/>
                    <button type='submit' className='fa fa-send' value=''/>
                </form>
                
            </div>
        </>
     );
}
 
export default memo(ClosingOpening(OpenMessage));