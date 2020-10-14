export const employeeSignIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.empEmail,
            credentials.empPassword
        ).then(() => {
            console.log("SignIn success")
            dispatch({ type: 'SIGN_IN_SUCCESS' });
        }).catch((err) => {
            console.log("SignIn Error")
            dispatch({ type: 'SIGN_OUT_SUCCESS', err });
        });

    }
}
