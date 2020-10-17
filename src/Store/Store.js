import {applyMiddleware, compose, createStore} from "redux";
import RootReducer from "./Reducers";
import thunk from "redux-thunk";
import {getFirebase} from "react-redux-firebase";
import {getFirestore, reduxFirestore} from "redux-firestore";
import firebase from "../Config/FirebaseConfig";

let singletonStoreInstance = null;

class Singleton {
    constructor() {
        if (!singletonStoreInstance) {
            singletonStoreInstance = this;

            singletonStoreInstance = createStore(RootReducer,
                compose(
                    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
                    reduxFirestore(firebase) // redux bindings for firestore
                )
            );
            //alert("Store Instance created");
        }

        //alert("Store Instance Get From Created Instance");
        return singletonStoreInstance;
    }
}

const store = new Singleton();
export default store;
