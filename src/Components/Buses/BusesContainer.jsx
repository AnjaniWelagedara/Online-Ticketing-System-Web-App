import AddIcon from '@material-ui/icons/Add';
import Backdrop from "@material-ui/core/Backdrop";
import BusesDialog from "../Shared/BusesDialog";
import BusSmallView from "./BusSmallView";
import CircularProgress from "@material-ui/core/CircularProgress";
import {compose} from "redux";
import {connect} from "react-redux";
import Container from "@material-ui/core/Container";
import Fab from '@material-ui/core/Fab';
import {firestoreConnect, isLoaded} from "react-redux-firebase";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from '@material-ui/core/styles';
import React, {useRef} from "react";
import Typography from "@material-ui/core/Typography";
import Tooltip from '@material-ui/core/Tooltip';
import {withRouter} from "react-router-dom";



const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(3),
        right: theme.spacing(3),
    }
}));

/*
Large view which contains buses
*/
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
/*Connect firebase*/
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