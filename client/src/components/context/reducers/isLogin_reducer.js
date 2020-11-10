export const islogin_reducer = (state, action) => {
    switch(action.type){
        case 'SET_ISLOGIN':
            return {
                isLogin : true,
                id : action.data
            }
        default:
            return state;
    }

}