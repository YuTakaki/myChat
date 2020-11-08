import React from 'react';
import '../styles/home.scss';
import people from '../assets/people.png';

const Home = () => {
    return (
        
        <div className='mainPage'>
            <main>
                <img src={people} />
                <div className='mainOption'>
                    <h1>myChat</h1>
                    <h2>Lets talk all day</h2>
                </div>
            </main>
            
        </div>
        
     );
}
 
export default Home;