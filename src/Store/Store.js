import {applyMiddleware, compose, createStore} from "redux";
import RootReducer from "./Reducers";
import thunk from "redux-thunk";
import {getFirebase} from "react-redux-firebase";
import {getFirestore, reduxFirestore} from "redux-firestore";
import firebase from "../Config/FirebaseConfig";

export const store = createStore(RootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
        reduxFirestore(firebase) // redux bindings for firestore
    )
);
