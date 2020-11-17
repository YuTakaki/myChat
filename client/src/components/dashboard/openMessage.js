import React, {useRef, useEffect, useState, memo, useContext, useCallback} from 'react';
import userLogo from '../../assets/yu.jpg';
import {Link} from 'react-router-dom';
import ClosingOpening from '../closing_opening_hoc';
import axios from 'axios';
import { USERDATA } from '../context/userData';
import {socket} from '../socket';

const OpenMessage = (props) => {
    const {closeUserView2} = props;
    const {user, user_dispatch} = useContext(USERDATA);
    const chat = useRef();
    const [userInfo, setUserInfo] = useState({});
    const [messages, setMessages] = useState([])
    const [room, setRoom] = useState('');
    useEffect(() => {
        if(props.match.params.username){
            socket.on('send', (user) => {
                setUserInfo(user);
                
            });
        }   
        return() => {
            socket.emit('disconnectUser', room);
        }   
    }, [])
    useEffect(() => {
        if(props.match.params.username !== userInfo.username && props.match.params.username){
            socket.emit('disconnectUser', room);
            axios.get(`/dashboard/user2/${props.match.params.username}`)
                .then(res => {
                    setUserInfo(res.data);
                    setMessages([]);
                                
                });
        };
    });
    useEffect(() => {
        const filterMessage = userInfo.messages !== undefined && userInfo.messages.filter(messageUser => messageUser.username === user.username)[0];
        if(filterMessage !== undefined){
            const updatedMessage = userInfo.messages !== undefined && filterMessage.messages;
            setMessages(updatedMessage);
        }
        const filterMessageRoom = userInfo.messages && userInfo.messages.filter(messageUser => messageUser.username === user.username)[0];
        if(filterMessageRoom !== undefined){
            const newRoom = user.username && filterMessageRoom._id;
            if(room !== newRoom || room === ''){
                setRoom(newRoom);
            }
            
        }  
    }, [userInfo]);

    useEffect(() => {
        chat.current.scrollTop = chat.current.scrollHeight;
    }, [messages]);

    useEffect(() => {
        if(room !== ''){
            socket.emit('connectToUser', room);
        }
        
    }, [room])
    const messageInput = useRef();
    
    const sendMessage = (e) => {
        e.preventDefault()
        const send = {
            message : messageInput.current.value,
            sender : user.username,
            username : userInfo.username,
        }
        setMessages([...messages, send]);
        socket.emit('sendMessage', {...send, room});
        messageInput.current.value = '';
    };
    return ( 
        <>
            <div className='chatHeader'>
                <Link to='/messages'><i className='fa fa-angle-left' onClick={closeUserView2}></i></Link>
                <Link to={userInfo._id && `/contacts/${userInfo.username}`}><img src={userLogo} /></Link>
                <div className='activeIndicator activeIndicatorTrue'></div>
                <h4>{userInfo.username}</h4>

            </div>
            <div className='chat' ref={chat}>
                {messages && messages.map(message => (
                    <div className={`chat-content ${message.sender === user.username ? 'userMessage' : ''}`}>
                        <img src={userLogo}/>
                        <div className='chat-message'>
                            <p>{message.message}</p>
                        </div>
                        <p>12:20am</p>
                    </div>
                ))}

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