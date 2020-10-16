import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {firestoreConnect, isLoaded} from "react-redux-firebase";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Grid} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TimeTableLargeViewContainer from "./TimeTableLargeViewContainer";
import {yellow} from "@material-ui/core/colors";


const useStyles = makeStyles((theme) => ({
    layout: {
        width: '100%',
        [theme.breakpoints.up(900 + theme.spacing(2) * 2)]: {
            marginLeft: theme.spacing(7),
            marginRight: theme.spacing(7),
        },
    },
    paperTop: {
        position: 'relative',
        zIndex: 2,
        backgroundColor: yellow[600],
        color: "white",
        marginTop: theme.spacing(5),
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
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

function TimeTableLargeView(props) {
    const classes = useStyles();

    let {route} = props
    route = {
        ...route,
        id: props.match.params.id
    }

    return (
        <Grid container>
            {(!isLoaded(route))
                ? <Backdrop open={true}>
                    <CircularProgress style={{color: "#fff"}}/>
                </Backdrop>
                :
                <main className={classes.layout}>
                    <Paper elevation={5} className={classes.paperTop}>
                        <Grid container justify={"center"} alignItems={"center"} spacing={1}>
                            <Typography variant="h5" align={"left"} style={{marginLeft: "10px"}}>
                                {route.routeNumber} : {route.start} - {route.end} : {route.hours} Hours {route.minutes} Minutes
                            </Typography>
                        </Grid>
                    </Paper>
                    <Paper elevation={5} className={classes.paper + " hoverable"}>
                        <TimeTableLargeViewContainer route={route} />
                    </Paper>

                </main>
            }


        </Grid>
    );
}

export default compose(
    firestoreConnect((props) => [
        {collection: 'routes', doc: props.match.params.id},
    ]),
    connect(({firestore: {data}}, props) => ({
        route: data.routes && data.routes[props.match.params.id],
    }))
)(TimeTableLargeView)
