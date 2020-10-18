import React from 'react'

import {isLoaded, isEmpty} from 'react-redux-firebase'
import {Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux'

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated or if auth is not
// yet loaded
export default function EmployeePrivateRoute({children, ...rest}) {
    const auth = useSelector(state => state.firebase.auth)
    return (
        <Route
            {...rest}
            render={({location}) =>
                isLoaded(auth) && !isEmpty(auth) ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    );
}
