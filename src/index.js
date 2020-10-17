import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import {Provider, useSelector} from 'react-redux'
import {createFirestoreInstance} from 'redux-firestore';
import {ReactReduxFirebaseProvider, isLoaded} from 'react-redux-firebase';
import store from './Store/Store'
import firebase from "./Config/FirebaseConfig";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import "./index.css"

const rrfProps = {
    firebase,
    config: {
        userProfile: 'users',
        useFirestoreForProfile: true
    },
    dispatch: store.dispatch,
    createFirestoreInstance,
};

function AuthIsLoaded({children}) {
    const auth = useSelector(state => state.firebase.auth)
    if (!isLoaded(auth)) return <Backdrop className={"backdrop"} open={true}>
        <CircularProgress color="inherit"/>
    </Backdrop>
    return children
}

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ReactReduxFirebaseProvider {...rrfProps}>
                <AuthIsLoaded>
                    <Router>
                        <App/>
                    </Router>
                </AuthIsLoaded>
            </ReactReduxFirebaseProvider>
        </Provider>
    </React.StrictMode>
    ,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
