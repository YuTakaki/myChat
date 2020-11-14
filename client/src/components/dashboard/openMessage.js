import React, {useRef, useEffect, useState, memo, useContext, useCallback} from 'react';
import userLogo from '../../assets/yu.jpg';
import {Link} from 'react-router-dom';
import ClosingOpening from '../closing_opening_hoc';
import axios from 'axios';
import { USERDATA } from '../context/userData';
import {socket} from '../socket';



const OpenMessage = (props) => {
    const {closeUserView2} = props;
    const {user} = useContext(USERDATA);
    
    
    const chat = useRef();
    const [userInfo, setUserInfo] = useState({});
    const [messages, setMessages] = useState([])
    const [room, setRoom] = useState('');
    useEffect(() => {
        if(props.match.params.id){
            console.log(2);
            socket.connect();
            
            socket.emit('connectToUser', room);

        }
        socket.on('send', (user) => {
            setUserInfo(user);
            console.log('hi');
        });
        
        return() => {
            // socket.emit('disconnectUser', room);
            socket.disconnect();
        }   
        
    }, [])
    

    useEffect(() => {
        
        if(props.match.params.id !== userInfo._id && props.match.params.id){
            axios.get(`/dashboard/user/${props.match.params.id}`)
                .then(res => {
                    setUserInfo(res.data);
                    const room = user.username && res.data.messages.filter(messageUser => messageUser.username === user.username)[0]._id;
                    setRoom(room);
                    console.log(room);
                    
                    
                    console.log(1);
                    
                    
                })
        }
        
    })
    useEffect(() => {
        // console.log(userInfo.messages);

        const filteredMessage = userInfo.messages !== undefined && userInfo.messages.filter(messageUser => messageUser.username === user.username)[0].messages;
        setMessages(filteredMessage);
    }, [userInfo]);

    useEffect(() => {
        chat.current.scrollTop = chat.current.scrollHeight;
    }, [messages]);


    

    const messageInput = useRef();
    
    
    const sendMessage = (e) => {
        e.preventDefault()
        const send = {
            message : messageInput.current.value,
            sender : user.username,
            username : userInfo.username,
        }
        // useCallback(() =>{ socket.emit('sendMessage', send)},[]);
        axios.post('/dashboard/sendMessage', send)
            .then(res => {
                socket.emit('sendMessage', {...send, room});
            });

        messageInput.current.value = '';
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