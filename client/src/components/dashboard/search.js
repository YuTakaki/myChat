import React from 'react';

const Search = () => {
    const showMenu = () => {
        document.querySelector('header').classList.add('showHeader');
        document.querySelector('.userView1').classList.add('viewHide');
    }
    return ( 
        <div className='search'>
            <i className='fa fa-bars' onClick={showMenu}></i>
            <form>
                <label className='fa fa-search'>
                    <input type='text' />
                </label>
            </form>
        </div>
     );
}
 
export default Search;