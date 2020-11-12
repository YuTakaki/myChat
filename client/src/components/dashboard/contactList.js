import React, {useContext} from 'react';
import userLogo from '../../assets/yu.jpg';
import {Link} from 'react-router-dom';
import ClosingOpening from '../closing_opening_hoc';
import { USERDATA } from '../context/userData';

const ContactList = (props) => {

    const navContactList = (e) => {
        document.querySelectorAll('.contactListContainer nav button')
            .forEach(e => e.classList.remove('activeContactBtn'));
        document.querySelectorAll('.contactListContainer div')
            .forEach(div => {
                if(div.classList[0] === e.target.classList[0]){
                    div.classList.add('activeContactContainer')
                }else{
                    div.classList.remove('activeContactContainer')
                }
                
            })
        e.target.classList.add('activeContactBtn');
    }

    const {user} = useContext(USERDATA);

    const { openUserView2 } = props;
    return ( 
        <div className='contactListContainer'>
            <nav>
                <button onClick={navContactList} className='activeContacts activeContactBtn'>Active</button>
                <button onClick={navContactList} className='allContacts'>All</button>
            </nav>
            <div className='activeContacts activeContactLists activeContactContainer'>
                {user.contacts && user.contacts.map(contact => contact.online && (
                    <Link to={`/contacts/${contact._id}`}>
                        <div className='contactActive' onClick={openUserView2}>
                            <img src={userLogo}/>
                            <div className='activeIndicator activeIndicatorTrue'></div>
                            <p>{contact.username}</p>
                        </div>
                    </Link>

                ))}
                

            </div>
            <div className='allContacts allContactLists'>
                {user.contacts && user.contacts.map(contact => (
                    <Link to={`/contacts/${contact._id}`}>
                        <div className='contactActive' onClick={openUserView2}>
                            <img src={userLogo}/>
                            <div className='activeIndicator activeIndicatorTrue'></div>
                            <p>{contact.username}</p>
                        </div>
                    </Link>

                ))}
                


            </div>

        </div>
     );
}
 
export default ClosingOpening(ContactList);