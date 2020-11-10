import React, {useState, useEffect, useRef} from 'react';
import user from '../../assets/yu.jpg';

const Search = () => {
    const [search, setSearch] = useState('');

    const showMenu = () => {
        document.querySelector('header').classList.add('showHeader');
        document.querySelector('.userView1').classList.add('viewHide');
    }
    const searchContainer = useRef();
    useEffect(()=>{
        if(search){
            searchContainer.current.classList.add('expandSearch');
        }else{
            searchContainer.current.classList.remove('expandSearch');

        };
    },[search])
    return ( 
        <>
            <div className='search'>
                <i className='fa fa-bars' onClick={showMenu}></i>
                <form>
                    <label className='fa fa-search'>
                        <input onChange={(e) => setSearch(e.target.value)} type='text' autoComplete={false} placeholder='search' value={search}/>
                    </label>
                </form>
            </div>
            <div ref={searchContainer} className='searched'>
                <div className='searchList'>
                    <img src={user}/>
                    <p>Yu Takaki</p>
                </div>
                <div className='searchList'>
                    <img src={user}/>
                    <p>Yu Takaki</p>
                </div>

            </div>
        </>
        
     );
}
 
export default Search;