import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {withRouter} from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import {compose} from "redux";
import {connect} from "react-redux";
import {firestoreConnect, isLoaded} from "react-redux-firebase";
import {green, red, orange, blue} from "@material-ui/core/colors";
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import PaymentIcon from '@material-ui/icons/Payment';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import SubtitlesIcon from '@material-ui/icons/Subtitles';
import TimelineIcon from '@material-ui/icons/Timeline';
import {deleteRoute} from "../Store/Actions/RouteActions";

const useStyles = makeStyles((theme) => ({

    paperTop: {
        position: 'relative',
        width: "70px",
        height: "70px",
        zIndex: 2,
        color: "white",
        marginLeft: theme.spacing(3),
        padding: theme.spacing(2),
    },
    paper: {
        position: 'relative',
        zIndex: 1,
        marginTop: -theme.spacing(4),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),

    },

}));

function DashboardItem(props) {
    const classes = useStyles();

    let buses = props.buses;
    let routes = props.routes;


    const Redirect = (path) => {
        props.history.push(`/dashboard/${path}`)
    }

    if (props.type == "buses") {
        return (
            <React.Fragment>

                <Paper
                    onClick={() => {
                        Redirect("buses")
                    }}
                    style={{backgroundColor: orange[500]}} elevation={5} className={classes.paperTop + " hoverable"}>
                    <Grid container justify={"center"} alignItems={"center"}>
                        <DirectionsBusIcon fontSize={"large"}/>
                    </Grid>
                </Paper>
                <Paper
                    onClick={() => {
                        Redirect("buses")
                    }}
                    elevation={5} className={classes.paper + " hoverable"}>
                    <Grid container justify={"flex-end"}>
                        <Grid item>
                            <Typography variant={"body1"} color={"textSecondary"} align={"right"}>
                                Buses
                            </Typography>
                            <Typography variant={"h5"} color={"textSecondary"} align={"right"}>
                                { buses && buses.length }
                            </Typography>
                        </Grid>

                    </Grid>
                </Paper>
            </React.Fragment>
        )
    } else if (props.type == "routes") {
        return (
            <React.Fragment>

                <Paper
                    onClick={() => {
                        Redirect("routes")
                    }}
                    style={{backgroundColor: green[500]}} elevation={5} className={classes.paperTop + " hoverable"}>
                    <Grid container justify={"center"} alignItems={"center"}>
                        <TimelineIcon fontSize={"large"}/>
                    </Grid>

                </Paper>
                <Paper
                    onClick={() => {
                        Redirect("routes")
                    }}
                    elevation={5} className={classes.paper + " hoverable"}>
                    <Grid container justify={"flex-end"}>
                        <Grid item>
                            <Typography variant={"body1"} color={"textSecondary"} align={"right"}>
                                Routes
                            </Typography>
                            <Typography variant={"h5"} color={"textSecondary"} align={"right"}>
                                { routes && routes.length }
                            </Typography>
                        </Grid>

                    </Grid>
                </Paper>
            </React.Fragment>
        )
    } else if (props.type == "timetables") {
        return (
            <React.Fragment>

                <Paper
                    onClick={() => {
                        Redirect("timetables")
                    }}
                    style={{backgroundColor: red[500]}} elevation={5} className={classes.paperTop + " hoverable"}>
                    <Grid container justify={"center"} alignItems={"center"}>
                        <SubtitlesIcon fontSize={"large"}/>
                    </Grid>

                </Paper>
                <Paper
                    onClick={() => {
                        Redirect("timetables")
                    }}
                    elevation={5} className={classes.paper + " hoverable"}>
                    <Grid container justify={"flex-end"}>
                        <Grid item>
                            <Typography variant={"body1"} color={"textSecondary"} align={"right"}>
                                Time Tables
                            </Typography>
                            <Typography variant={"h5"} color={"textSecondary"} align={"right"}>
                                { routes && routes.length }
                            </Typography>
                        </Grid>

                    </Grid>
                </Paper>
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                <Paper style={{backgroundColor: blue[500]}} elevation={5} className={classes.paperTop + " hoverable"}>
                    <Grid container justify={"center"} alignItems={"center"}>
                        <PaymentIcon fontSize={"large"}/>
                    </Grid>

                </Paper>
                <Paper elevation={5} className={classes.paper + " hoverable"}>
                    <Grid container justify={"flex-end"}>
                        <Grid item>
                            <Typography variant={"body1"} color={"textSecondary"} align={"right"}>
                                Tokens
                            </Typography>
                            <Typography variant={"h5"} color={"textSecondary"} align={"right"}>
                                +1000
                            </Typography>
                        </Grid>

                    </Grid>
                </Paper>
            </React.Fragment>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        buses: state.firestore.ordered.buses,
        routes: state.firestore.ordered.routes,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => {
        return [
            {
                collection: 'buses',
            }, {
                collection: 'routes',
            }
        ]
    })
)(withRouter(DashboardItem))
