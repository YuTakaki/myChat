import React, {useState, useEffect, useRef, useContext} from 'react';
import user from '../../assets/yu.jpg';
import axios from 'axios';
import { IS_LOGIN } from '../context/isLogin';
import {Link} from 'react-router-dom';
import ClosingOpening from '../closing_opening_hoc';

const Search = (props) => {
    const [search, setSearch] = useState('');
    const {islogin} = useContext(IS_LOGIN);
    const [searchResult, setSearchResult] = useState([]);

    const showMenu = () => {
        document.querySelector('header').classList.add('showHeader');
        document.querySelector('.userView1').classList.add('viewHide');
    }
    const searchContainer = useRef();
    const closeSearchIcon = useRef();
    useEffect(()=>{
        if(search){
            searchContainer.current.classList.add('expandSearch');
            axios.post(`/dashboard/advance-search/${islogin.id}`, {username : search})
            .then(res => {
                setSearchResult(res.data);
                closeSearchIcon.current.classList.add('closeSearchIcon');
            });
        }else{
            searchContainer.current.classList.remove('expandSearch');
            setSearchResult([]);
            closeSearchIcon.current.classList.remove('closeSearchIcon');
        };
        

    },[search]);

    const closeSearch = () => {
        setSearch('');
    }

    const clickSearch = () => {
        closeSearch()
        props.openUserView2();
    }
    return ( 
        <>
            <div className='search'>
                <i className='fa fa-bars' onClick={showMenu}></i>
                <form>
                    <label className='fa fa-search'>
                        <input onChange={(e) => setSearch(e.target.value)} type='text' autoComplete={false} placeholder='search' value={search}/>
                        <i onClick={closeSearch} ref={closeSearchIcon} className='fa fa-close'></i>
                    </label>
                </form>
            </div>
            <div ref={searchContainer} className='searched'>
                {searchResult.map(search => (
                    <Link to={`/messages/${search.username}`}>
                        <div onClick={clickSearch} className='searchList'>
                            <img src={user}/>
                            <p>{search.username}</p>
                        </div>

                    </Link>
                ))}
                {searchResult.length === 0 && (
                    <p>No result found</p>
                )}
            </div>
        </>
        
     );
}
 
export default ClosingOpening(Search);