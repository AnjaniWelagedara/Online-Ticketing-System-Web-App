import React, {useEffect, useState} from 'react';
import {Route, Switch, withRouter} from "react-router-dom";

import Login from "./Components/Login";
import DashBoard from "./Components/DashBoard";
import EmployeePrivateRoute from "./Components/EmployeePrivateRoute";
import NavigationBar from "./Components/Shared/NavigationBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import {createMuiTheme, MuiThemeProvider, responsiveFontSizes} from "@material-ui/core/styles";
import {deepPurple} from "@material-ui/core/colors";
import {compose} from "redux";
import {connect} from "react-redux";

function App({location}) {
    const [currentPath, setCurrentPath] = useState(location.pathname);

    const navBarVisibility = () => {
        if (
            currentPath === "/"
        ) {
            return false;
        }
        return true;
    };

    useEffect(() => {
        setCurrentPath(location.pathname);
    }, [location.pathname]);

    const Theme = responsiveFontSizes(createMuiTheme({
        palette: {
            primary: deepPurple,
            type: "dark",
        },
    }));

    return (
        <MuiThemeProvider theme={Theme}>
            <CssBaseline/>
            {(navBarVisibility()) ? <NavigationBar/> : <div/>}

            <Switch>
                <Route path={"/"} component={Login}/>
                <EmployeePrivateRoute path="/dashboard">
                    <DashBoard/>
                </EmployeePrivateRoute>
            </Switch>
        </MuiThemeProvider>
    );
}

const mapStateToProps = state => {
    console.log(state)
    return {}
};

export default compose(
    connect(mapStateToProps),
    withRouter
)(App)
