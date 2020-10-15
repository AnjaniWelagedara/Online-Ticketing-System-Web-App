export const addBus = (details, callback) => {
    return (dispatch, getState, {getFirestore}) => {

        dispatch({type: 'SHOW_BACKDROP'});
        const firestore = getFirestore();

        firestore.collection('buses').add(
            details
        ).then(() => {
            dispatch({type: 'HIDE_BACKDROP'});
            callback(
                {
                    status: true,
                }
            )
        }).catch(err => {
            dispatch({type: 'HIDE_BACKDROP'});
            console.log("Error occurred while FIREBASE DATA UPLOADING", err);
            callback(
                {
                    status: false,
                    error: "Error occurred while FIREBASE DATA UPLOADING"
                }
            )
        });

    }
};