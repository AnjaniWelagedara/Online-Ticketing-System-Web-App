import React, {useEffect, useState} from 'react';
import {Route, Switch, withRouter} from "react-router-dom";
import Login from "./Components/Login";
import DashBoard from "./Components/DashBoard";
import BusesContainer from "./Components/Buses/BusesContainer";
import RoutesContainer from "./Components/Routes/RoutesContainer";
import TimetablesContainer from "./Components/TimeTables/TimetablesContainer";
import EmployeePrivateRoute from "./Components/EmployeePrivateRoute";
import NavigationBar from "./Components/Shared/NavigationBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import {createMuiTheme, MuiThemeProvider, responsiveFontSizes} from "@material-ui/core/styles";
import {deepPurple} from "@material-ui/core/colors";
import {compose} from "redux";
import {connect} from "react-redux";
import "./App.css"

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

                <EmployeePrivateRoute path="/dashboard/buses">
                    <BusesContainer/>
                </EmployeePrivateRoute>
                <EmployeePrivateRoute path="/dashboard/routes">
                    <RoutesContainer/>
                </EmployeePrivateRoute>
                <EmployeePrivateRoute path="/dashboard/timetables">
                    <TimetablesContainer/>
                </EmployeePrivateRoute>
                <EmployeePrivateRoute path="/dashboard">
                    <DashBoard/>
                </EmployeePrivateRoute>
                <Route path={"/"} component={Login}/>
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
