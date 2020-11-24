import { use } from 'passport';
import React, {useContext, useState} from 'react';
import userLogo from '../../assets/yu.png';
import { USERDATA } from '../context/userData';
import axios from 'axios';
import {Link} from 'react-router-dom';
import ClosingOpening from '../closing_opening_hoc';

const ProfilePicture = ({closeUserView2}) => {
    const {user, user_dispatch} = useContext(USERDATA);
    const [image, setImage] = useState({
        img : '',
        previewImage : ''
    });
    const settingImage = (e) => {
        setImage({
            img : e.target.files[0],
            previewImage : URL.createObjectURL(e.target.files[0])
        });
    }
    const cancelUpdatingImage = () => {
        setImage({
            img : '',
            previewImage : ''
        });

    }
    const updateImage = () => {
        
        const url = 'https://api.cloudinary.com/v1_1/yutakaki/image/upload';
        const preset = 'hnvazonp';
        const formData = new FormData();
        formData.append('file', image.img);
        formData.append('upload_preset', preset);
        axios.post(url, formData)
            .then(res => {
                axios.post(`/dashboard/updateImage/${ user._id}`, {img : res.data.secure_url})
                    .then(res => {
                        user_dispatch({type : 'USER', data : res.data});
                        setImage({
                            img : '',
                            previewImage : ''
                        });
                    })
                
            })
    }
    return ( 
        <div className='profilePic'>
            <Link to='/settings'><i className='fa fa-angle-left' onClick={closeUserView2}></i></Link>
            <div className='profilePicContainer'>
                <img src={image.previewImage && image.previewImage ? image.previewImage : !user.profile ? userLogo : user.profile}/>
                <label htmlFor='profilePic' className='fa fa-camera'></label>
                <input onChange={settingImage} type='file' id='profilePic' multiple={false} accept='image/*'/>
            </div>
            <h1>{user.username}</h1>
            {image.img !== '' && (
                <div className='confirmationButton'>
                    <button onClick={updateImage}>Save</button>
                    <button onClick={cancelUpdatingImage}>Cancel</button>

                </div>
            )}

        </div>
     );
}
 
export default ClosingOpening(ProfilePicture);