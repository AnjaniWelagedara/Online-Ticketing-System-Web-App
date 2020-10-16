import React, {useRef} from "react";
import {makeStyles} from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import {withRouter} from "react-router-dom";
import BusesDialog from "../Shared/BusesDialog";
import {compose} from "redux";
import {connect} from "react-redux";
import {firestoreConnect, isLoaded} from "react-redux-firebase";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import BusSmallView from "./BusSmallView";
import {deleteRoute} from "../../Store/Actions/RouteActions";


const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(3),
        right: theme.spacing(3),
    }
}));

function BusesContainer(props) {
    const classes = useStyles();
    let { routes, buses} = props;

    const addBusesDialogRef = useRef();
    return (


        <React.Fragment>
            {(!isLoaded(buses && routes))
                ? <Backdrop open={true}>
                    <CircularProgress style={{color: "#fff"}}/>
                </Backdrop>
                :
                <Container
                    maxWidth="lg"
                    style={{marginBottom: "50px", marginTop: "50px"}}
                >
                    <BusesDialog ref={addBusesDialogRef} route={routes}/>
                    <Grid container style={{marginTop: "50px"}}>
                        <Grid xs={12} item>
                            <Typography align={"center"} variant={"h4"} gutterBottom>
                                All Buses
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container direction={"row"}>
                        {buses && buses.map(bus => {
                            return <BusSmallView key={bus.id} bus={bus} routes={routes}/>
                        })}
                    </Grid>

                    <Tooltip title="Add Route." arrow>
                        <Fab
                            size="small"
                            className={classes.fab}
                            color={"primary"}
                            onClick={() => {
                                addBusesDialogRef.current.handleClickOpenForCreate(routes);
                            }}
                        >
                            <AddIcon/>
                        </Fab>
                    </Tooltip>
                </Container>
            }
        </React.Fragment>

    )
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
            },
            {
                collection: 'routes',
            }
        ]
    })
)(withRouter(BusesContainer))