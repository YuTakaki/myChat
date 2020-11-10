import React, {createContext, useReducer, useEffect} from 'react';
import { islogin_reducer } from './reducers/isLogin_reducer';

export const IS_LOGIN = createContext();
const IsLogin = (props) => {
    const [islogin, islogin_dispatch] = useReducer(islogin_reducer, {}, () => {
        return localStorage.getItem('myChat') ? JSON.parse(localStorage.getItem('myChat')) :
        {
            isLogin : false,
            id : ''
        }
    })
    useEffect(()=> {
        localStorage.setItem('myChat', JSON.stringify(islogin));
        console.log(islogin);

    },[islogin])
    return ( 
        <IS_LOGIN.Provider value={{islogin, islogin_dispatch}}>
            {props.children}
        </IS_LOGIN.Provider>
     );
}
export default IsLogin;