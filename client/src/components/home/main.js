import React from 'react';
import people from '../../assets/chat.svg';
import {Link} from 'react-router-dom';

const Main = () => {
    return (
        <main>
            <div className='main-section'>
                <h1>Talk with every one any where</h1>
                <p>A chat application that connects you and everyone</p>
                <Link to='/home/sign-in'><button>Get Started</button></Link>
            </div>
            <img src={people} />
        </main>  
      );
}
 
export default Main;