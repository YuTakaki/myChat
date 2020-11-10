export const islogin_reducer = (state, action) => {
    switch(action.type){
        case 'SET_ISLOGIN':
            return {
                isLogin : true,
                id : action.data
            }
        case 'LOGOUT':
            return{
                isLogin : false,
                id : ''
            }
        default:
            return state;
    }

}