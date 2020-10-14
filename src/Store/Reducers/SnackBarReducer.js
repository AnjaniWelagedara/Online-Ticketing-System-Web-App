const initState = {
    isShow : false,
    msg : ""
}

const SnackBarReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SHOW_SNACKBAR':
            return {
                ...state,
                isShow:true,
                msg : action.msg
            }
        case 'HIDE_SNACKBAR':
            return {
                ...state,
                isShow: false,
                msg : ""
            }
        default:
            return state;
    }
};

export default SnackBarReducer;
