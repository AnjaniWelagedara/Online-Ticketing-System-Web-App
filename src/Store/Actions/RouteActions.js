export const addRoute = (details, callback) => {
    return (dispatch, getState, {getFirestore}) => {

        dispatch({type: 'SHOW_BACKDROP'});
        const firestore = getFirestore();

        firestore.collection('routes').add(
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

export const deleteRoute = (id, callback) => {
    return (dispatch, getState, {getFirestore}) => {

        dispatch({type: 'SHOW_BACKDROP'});
        const firestore = getFirestore();

        firestore.collection("routes").doc(id).delete()
            .then(res => {
                dispatch({type: 'HIDE_BACKDROP'});
                callback(
                    {
                        status: true,
                    }
                )

            }).catch(error => {
            console.log(error)
            dispatch({type: 'HIDE_BACKDROP'});
            callback(
                {
                    status: false,
                    error: error
                }
            )
        })

    }
};

export const editRoute = (id, details, callback) => {
    return (dispatch, getState, {getFirestore}) => {

        dispatch({type: 'SHOW_BACKDROP'});
        const firestore = getFirestore();

        firestore.collection("routes").doc(id).set(details, {merge: true}).then(res => {
            console.log(res);
            dispatch({type: 'HIDE_BACKDROP'});
            callback(
                {
                    status: true,
                }
            )
        }).catch(err => {
            console.log(err);
            dispatch({type: 'HIDE_BACKDROP'});
            callback(
                {
                    status: false,
                    error: "Error occurred while FIREBASE DATA UPDATING"
                }
            )
        })

    }
};
