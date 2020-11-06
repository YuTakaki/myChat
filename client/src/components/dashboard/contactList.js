import React from 'react';
import user from '../../assets/yu.jpg';

const ContactList = () => {

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
    return ( 
        <div className='contactListContainer'>
            <nav>
                <button onClick={navContactList} className='activeContacts activeContactBtn'>Active</button>
                <button onClick={navContactList} className='allContacts'>All</button>
            </nav>
            <div className='activeContacts activeContactLists activeContactContainer'>
                <div className='contactActive'>
                    <img src={user}/>
                    <div className='activeIndicator activeIndicatorTrue'></div>
                    <p>Yu Takaki</p>
                </div>

            </div>
            <div className='allContacts allContactLists'>

            </div>

        </div>
     );
}
 
export default ContactList;