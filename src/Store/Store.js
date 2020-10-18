/*Registration Number: IT18180626
Author: H.M.A.N.Welagedara
Group Number: 2020-REG-WE-20*/
import {applyMiddleware, compose, createStore} from "redux";
import firebase from "../Config/FirebaseConfig";
import {getFirebase} from "react-redux-firebase";
import {getFirestore, reduxFirestore} from "redux-firestore";
import RootReducer from "./Reducers";
import thunk from "redux-thunk";
/*Used singleton pattern to create single object*/


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
