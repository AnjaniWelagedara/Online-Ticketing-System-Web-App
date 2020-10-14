const initState = {
    isShow : false
}

const ShowBackdropReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SHOW_BACKDROP':
            return {
                ...state,
                isShow:true
            }
        case 'HIDE_BACKDROP':
            return {
                ...state,
                isShow: false
            }
        default:
            return state;
    }
};

export default ShowBackdropReducer;
