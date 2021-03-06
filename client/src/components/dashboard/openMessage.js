import React, {useRef, useEffect, useState, memo, useContext, useCallback} from 'react';
import userLogo from '../../assets/yu.png';
import {Link} from 'react-router-dom';
import ClosingOpening from '../closing_opening_hoc';
import axios from 'axios';
import { USERDATA } from '../context/userData';
import {socket} from '../socket';
import { IS_LOGIN } from '../context/isLogin';

const OpenMessage = (props) => {
    const {closeUserView2} = props;
    const {user, user_dispatch} = useContext(USERDATA);
    const {islogin} = useContext(IS_LOGIN);
    const [uploadingMessages, setUploadinMessages] = useState(false)
    const chat = useRef();
    const [userInfo, setUserInfo] = useState({});
    const [messages, setMessages] = useState([])
    const [room, setRoom] = useState('');
    const [loading, setLoading] = useState(true);
    const [messageImage, setMessageImage] = useState({
        previewImages : [],
        images : []
    });

    useEffect(() => {
        if(props.match.params.id){
            socket.on('send', (user) => {
                setUserInfo(user);
            });
        }   
        return() => {
            socket.emit('disconnectUser', room);
        }   
    }, [])
    useEffect(() => {
    },[messageImage])
    useEffect(() => {

        if(props.match.params.id !== userInfo._id && props.match.params.id){
            setLoading(true);
            
            socket.emit('disconnectUser', room);
            
            if(props.match.params.id !== undefined){
                axios.post(`/dashboard/message/seen/${islogin.id}`, {user_id : props.match.params.id})
                .then(res => {
                    user_dispatch({type : 'USER', data : res.data});
                });
                axios.get(`/dashboard/user2/${props.match.params.id}`)
                    .then(res => {
                        if(!res.data){
                            props.history.push('/messages');
                            
                        }else{
                            setUserInfo(res.data);
                            setMessages([]);
                            setMessageImage({
                                previewImages : [],
                                images : []
                            });
                            setLoading(false);
                        }
                        
                                    
                    });

            }
            
        };
    });
    useEffect(() => {
        const filterMessage = user.messages && user.messages.filter(msg => msg.user_id === userInfo._id);
        console.log(filterMessage);
        if(filterMessage !== undefined){
            if(filterMessage.length > 0){
                setMessages(filterMessage[0].messages);
                if(room !== filterMessage[0]._id || room === ''){
                    setRoom(filterMessage[0]._id)
                }
            }
        }
    }, [userInfo]);

    useEffect(() => {
        console.log(messages);
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
        let send;
        const messageValue = messageInput.current.value;

        if(messageImage.images.length > 0){
            setUploadinMessages(true);
            const url = 'https://api.cloudinary.com/v1_1/yutakaki/image/upload';
            const preset = 'hnvazonp';
            let sendingImages = [];
            const uploadImages = [...messageImage.images];
            setMessageImage({
                previewImages : [],
                images : []
            });
            uploadImages.forEach(img => {
                const formData = new FormData();
                formData.append('file', img);
                formData.append('upload_preset', preset);
                axios.post(url, formData)
                    .then(res => {
                        sendingImages.push({image : res.data.secure_url})
                        if(sendingImages.length === messageImage.images.length){
                            console.log(sendingImages);
                            send = {
                                message : messageValue,
                                sender_id : user._id,
                                to: userInfo._id,
                                senderProfile : userInfo.profile,
                                username : userInfo.username,
                                images : sendingImages,
                                date : Date.now()
                            }
                            setMessages([...messages, send]);
                            socket.emit('sendMessage', {...send, room});
                            messageInput.current.value = '';
                            setUploadinMessages(false);
                        }
                    });

            });

       }else if(messageInput.current.value && messageImage.images.length === 0){
            send = {
                message : messageValue,
                sender_id : user._id,
                to: userInfo._id,
                senderProfile : userInfo.profile,
                username : userInfo.username,
                images : [],
                date : Date.now()
            }
            setMessages([...messages, send]);
            socket.emit('sendMessage', {...send, room});
            messageInput.current.value = '';
       }
    };

    const prepareImage = (e) => {
        const previewImages = [...e.target.files].map(file => URL.createObjectURL(file));
        setMessageImage({
            images : [...e.target.files],
            previewImages
        })
    }

    const removeMessageImage = (i) => {
        const updatedImg = messageImage.images.filter((img, index) => index !== i);
        const updatedPreviewImg = messageImage.previewImages.filter((img, index) => index !== i);
        setMessageImage({
            images : updatedImg,
            previewImages : updatedPreviewImg,
        });
    }
    
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
                const am_pm = date.getHours() >= 12 ? 'pm' : 'am';
                hour = hour <= 10 ? '0' + hour : hour;
                const minute = date.getMinutes() <= 10 ? '0' + date.getMinutes() : date.getMinutes();
                

                return `${hour} : ${minute} ${am_pm}`

        }else if(currentDate.getMonth() === date.getMonth() &&
            currentDate.getFullYear() === date.getFullYear()&& 
            currentDate.getDate() - date.getDate() <= 6){
                return `${day[date.getDay()]}`

        }else{
            return `${month[date.getMonth()]} ${date.getDate()}`
        }
    }
    return ( 
        <>
            <div className='chatHeader'>
                <Link to='/messages' onClick={closeUserView2}><i className='fa fa-angle-left' ></i></Link>
                <Link to={userInfo._id && `/contacts/${userInfo._id}`}><img src={userLogo} /></Link>
                <div className='activeIndicator activeIndicatorTrue'></div>
                <h4>{userInfo.username}</h4>

            </div>
            <div className='chat' ref={chat}>
                {loading === true ? (
                    <div className='loading'>
                    </div>
                ) : messages && messages.map(message => (
                    <div className={`chat-content ${message.sender_id === user._id ? 'userMessage' : ''}`}>
                        <img src={message.sender_id === user._id ? user.profile === '' ? userLogo : user.profile : userInfo.profile === ''? userLogo : userInfo.profile}/>
                        <div className='chat-message'>
                            <p>{message.message}</p>
                            <div className='sentImage'>
                            { message.images && message.images.length > 0 && message.images.map((img, i) => (
                                    <img src={img.image}/>
                            ))}
                            </div>
                        </div>
                        <p>{setDate(message.date)}</p>
                    </div>
                ))}
                

            </div>
            {uploadingMessages && (
                <div className='pleaseWaitUploadinImages'>
                    <p>uplading messages please wait</p>
                </div>
            )}
            {messageImage.previewImages.length > 0 && (
                <div className='previewImage'>
                    {messageImage.previewImages.map((img, i) => (
                        <div className='image'>
                            <i onClick={() => removeMessageImage(i)} className='fa fa-close'></i>
                            <img src={img}/>

                        </div>
                        
                    ))}

                </div>
            )}
            <div className='chat-input'>
                <form  onSubmit={sendMessage}>
                    <label htmlFor='file' className='fa fa-image'>
                    </label>
                    <input onChange={prepareImage} id='file' type='file' accept='image/*' multiple={true}/>
                    <textarea ref={messageInput} placeholder='message'/>
                    <button type='submit' className='fa fa-send' value=''/>
                </form>
                
            </div>
        </>
     );
}
 
export default memo(ClosingOpening(OpenMessage));