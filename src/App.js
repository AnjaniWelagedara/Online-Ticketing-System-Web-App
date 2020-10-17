import React, {useEffect, useState} from 'react';
import {Route, Switch, withRouter} from "react-router-dom";
import Login from "./Components/Login";
import DashBoard from "./Components/DashBoard";
import BusesContainer from "./Components/Buses/BusesContainer";
import RoutesContainer from "./Components/Routes/RoutesContainer";
import TimetablesContainer from "./Components/TimeTables/TimetablesContainer";
import TimeTableLargeView from "./Components/TimeTables/TimeTableLargeView";
import PassengersContainer from "./Components/Passengers/PassengersContainer";
import EmployeePrivateRoute from "./Components/EmployeePrivateRoute";
import NavigationBar from "./Components/Shared/NavigationBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import {createMuiTheme, MuiThemeProvider, responsiveFontSizes} from "@material-ui/core/styles";
import {yellow} from "@material-ui/core/colors";
import {compose} from "redux";
import {connect} from "react-redux";
import SnackBar from "./Components/Shared/SnackBar";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import "./App.css"

function App({location, snackBar, backdrop}) {
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
            primary: yellow,
            type: "dark",
        },
    }));

    return (
        <MuiThemeProvider theme={Theme}>
            <CssBaseline/>
            {(navBarVisibility()) ? <NavigationBar/> : <div/>}

            {(snackBar.isShow)
                ? <SnackBar msg={snackBar.msg}/>
                : <React.Fragment/>
            }

            <Backdrop style={{zIndex: "2500"}} open={backdrop.isShow}>
                <CircularProgress style={{color: "#fff"}}/>
            </Backdrop>

            <Switch>
                <EmployeePrivateRoute exact path="/dashboard/buses">
                    <BusesContainer/>
                </EmployeePrivateRoute>
                <EmployeePrivateRoute exact path="/dashboard/routes">
                    <RoutesContainer/>
                </EmployeePrivateRoute>
                <EmployeePrivateRoute exact path="/dashboard/timetables">
                    <TimetablesContainer/>
                </EmployeePrivateRoute>
                <EmployeePrivateRoute exact path="/dashboard/passengers">
                    <PassengersContainer/>
                </EmployeePrivateRoute>
                <Route exact path={"/dashboard/timetable/:id"} component={TimeTableLargeView}/>
                <EmployeePrivateRoute exact path="/dashboard">
                    <DashBoard/>
                </EmployeePrivateRoute>
                <Route exact path={"/"} component={Login}/>
            </Switch>
        </MuiThemeProvider>
    );
}

const mapStateToProps = state => {
    console.log(state)
    return {
        backdrop: state.isShow,
        snackBar: state.snackBar,
    }
};

export default compose(
    connect(mapStateToProps),
    withRouter
)(App)
