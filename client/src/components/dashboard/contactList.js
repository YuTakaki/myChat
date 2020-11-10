import React from 'react';
import user from '../../assets/yu.jpg';
import {Link} from 'react-router-dom';
import ClosingOpening from '../closing_opening_hoc';

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

    const { openUserView2 } = props;
    return ( 
        <div className='contactListContainer'>
            <nav>
                <button onClick={navContactList} className='activeContacts activeContactBtn'>Active</button>
                <button onClick={navContactList} className='allContacts'>All</button>
            </nav>
            <div className='activeContacts activeContactLists activeContactContainer'>
                <Link to='/contacts/sa'>
                    <div className='contactActive' onClick={openUserView2}>
                        <img src={user}/>
                        <div className='activeIndicator activeIndicatorTrue'></div>
                        <p>Yu Takaki</p>
                    </div>
                </Link>
                <Link to='/contacts/sa'>
                    <div className='contactActive' onClick={openUserView2}>
                        <img src={user}/>
                        <div className='activeIndicator activeIndicatorTrue'></div>
                        <p>Yu Takaki</p>
                    </div>
                </Link>
                

            </div>
            <div className='allContacts allContactLists'>
                <Link to='/contacts/sa'>
                    <div className='contactActive' onClick={openUserView2}>
                        <img src={user}/>
                        <div className='activeIndicator activeIndicatorTrue'></div>
                        <p>Yu Takaki</p>
                    </div>
                </Link>


            </div>

        </div>
     );
}
 
export default ClosingOpening(ContactList);