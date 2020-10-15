import React, {useRef} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {firestoreConnect, isLoaded} from "react-redux-firebase";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Grid} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TimeTableDaysView from "./TimeTableDaysView";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import TripsDialog from "../Shared/TripsDialog";


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
        backgroundColor: "#673ab7",
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
    fab: {
        position: 'fixed',
        bottom: theme.spacing(3),
        right: theme.spacing(3),
    }
}));

function TimeTableLargeView(props) {
    const classes = useStyles();
    const addTripDialogRef = useRef();
    let {timetable} = props
    timetable = {
        ...timetable,
        id: props.match.params.id
    }

    return (
        <Grid container>
            {(!isLoaded(timetable))
                ? <Backdrop open={true}>
                    <CircularProgress style={{color: "#fff"}}/>
                </Backdrop>
                :
                <main className={classes.layout}>
                    <TripsDialog ref={addTripDialogRef}/>
                    <Paper elevation={5} className={classes.paperTop}>
                        <Grid container  justify={"center"} alignItems={"center"} spacing={1}>
                            <Typography  variant="h5" align={"left"} style={{marginLeft : "10px"}}>
                                {timetable.routeNumber}  :  {timetable.station1} - {timetable.station2}
                            </Typography>
                        </Grid>
                    </Paper>
                    <Paper elevation={5} className={classes.paper + " hoverable"}>
                        <Tooltip title="Add Trip." arrow>
                            <Fab
                                size="small"
                                className={classes.fab}
                                color={"primary"}
                                onClick={() => {
                                    addTripDialogRef.current.handleClickOpenForCreate();
                                }}
                            >
                                <AddIcon/>
                            </Fab>
                        </Tooltip>
                        <TimeTableDaysView timetable={timetable}/>
                    </Paper>

                </main>
            }


        </Grid>
    );
}

export default compose(
    firestoreConnect((props) => [
        {collection: 'timetables', doc: props.match.params.id}
    ]),
    connect(({firestore: {data}}, props) => ({
        timetable: data.timetables && data.timetables[props.match.params.id]
    }))
)(TimeTableLargeView)
