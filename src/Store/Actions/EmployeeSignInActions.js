export const employeeSignIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        dispatch({type: 'SHOW_BACKDROP'});
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.empEmail,
            credentials.empPassword
        ).then(() => {
            console.log("SignIn success")
            dispatch({type: 'HIDE_BACKDROP'});
        }).catch((err) => {
            alert(err)
            console.log("SignIn Error")
            dispatch({type: 'HIDE_BACKDROP'});
        });

    }
}
