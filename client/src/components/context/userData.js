import React, {createContext, useEffect, useReducer} from 'react';
import { userReducer } from './reducers/userReducer';

export const USERDATA = createContext();

const Userdata = (props) => {
    const [user, user_dispatch] = useReducer(userReducer,{});

    useEffect(() => {
        console.log(user);
    }, [user])
    return ( 
        <USERDATA.Provider value={{user, user_dispatch}}>
            {props.children}

        </USERDATA.Provider>
     );
}
 
export default Userdata;