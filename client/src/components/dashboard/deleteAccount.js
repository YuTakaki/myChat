import React,{useRef, useContext} from 'react';
import ClosingOpening from '../closing_opening_hoc';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { IS_LOGIN } from '../context/isLogin';

const DeleteAccount = ({closeUserView2}) => {
    const {islogin, islogin_dispatch} = useContext(IS_LOGIN);
    const delInput = useRef();
    const deleteAccount = (e) => {
        e.preventDefault();
        axios.delete(`/dashboard/delete-account/${islogin.id}`, {password : delInput.current.value})
            .then(res => {
                if(res.data){
                    islogin_dispatch({type : 'LOGOUT'});
                }else{
                    alert('wrong password');
                }
            });
    }
    return ( 
        <div className='delAccount'>
            <Link to='/settings'><i className='fa fa-angle-left' onClick={closeUserView2}></i></Link>
            <form onSubmit={deleteAccount}>
                <p>Enter your password to confirm account deletion</p>
                <input ref={delInput} type='text' required={true}/>
                <input type='submit' value='delete account' />
            </form>
        </div>
     );
}
 
export default ClosingOpening(DeleteAccount);