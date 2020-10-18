import React, {useRef} from "react";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {connect} from "react-redux";
import {firestoreConnect, isLoaded} from "react-redux-firebase";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import TimeTableDaysView from "./TimeTableDaysView";
import TripsDialog from "../Shared/TripsDialog";
import {makeStyles} from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(3),
        right: theme.spacing(3),
    }
}));

function DashboardItem(props) {
    const classes = useStyles();
    const addTripDialogRef = useRef();
    let buses = props.buses;
    let route = props.route;
    return (
        <React.Fragment>
            {(!isLoaded(buses))
                ? <Backdrop open={true}>
                    <CircularProgress style={{color: "#fff"}}/>
                </Backdrop>
                : <React.Fragment>
                    <TripsDialog ref={addTripDialogRef} route={route} buses={buses}/>
                    <Tooltip title="Add Trip." arrow>
                        <Fab
                            size="small"
                            className={classes.fab}
                            color={"primary"}
                            onClick={() => {
                                addTripDialogRef.current.handleClickOpenForCreate(route, buses);
                            }}
                        >
                            <AddIcon/>
                        </Fab>
                    </Tooltip>
                    <TimeTableDaysView route={route} buses={buses}/>
                </React.Fragment>
            }
        </React.Fragment>
    )

}

const mapStateToProps = (state) => {
    return {
        buses: state.firestore.ordered.buses,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => {
        return [
             {
                collection: 'buses',
            }
        ]
    })
)(withRouter(DashboardItem))
