export const userReducer = (state, action) => {
    switch(action.type){
        case 'USER':
            return action.data;
        default:
            return state
    }
}