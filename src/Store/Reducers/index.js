import {combineReducers} from 'redux'
import {firestoreReducer} from 'redux-firestore';
import {firebaseReducer} from 'react-redux-firebase';
import ShowBackdropReducer from "./ShowBackdropReducer";
import SnackBarReducer from "./SnackBarReducer";

const RootReducer = combineReducers({
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    isShow: ShowBackdropReducer,
    snackBar: SnackBarReducer,
});

export default RootReducer
