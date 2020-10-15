import React, {useRef} from "react";
import {makeStyles, useTheme} from '@material-ui/core/styles';
import RouteSmallView from "./RouteSmallView";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import RouteDialog from "../Shared/RouteDialog";
import {compose} from "redux";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {withRouter} from "react-router-dom";
import {deleteRoute} from "../../Store/Actions/RouteActions";


const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(3),
        right: theme.spacing(3),
    }
}));

function RoutesContainer(props) {
    const classes = useStyles();
    let routes = props.routes;

    const addRouteDialogRef = useRef();

    return (
        <Container
            maxWidth="lg"
            style={{marginBottom: "50px", marginTop: "50px"}}
        >
            <RouteDialog ref={addRouteDialogRef}/>
            <Grid container style={{marginTop: "50px"}}>
                <Grid xs={12} item>
                    <Typography align={"center"} variant={"h4"} gutterBottom>
                        All Routes
                    </Typography>
                </Grid>
            </Grid>

            <Grid container direction={"row"}>
                {routes && routes.map(route => {
                    return <RouteSmallView key={route.id} route={route} deleteRoute={deleteRoute}/>
                })}
            </Grid>

            <Tooltip title="Add Route." arrow>
                <Fab
                    size="small"
                    className={classes.fab}
                    color={"primary"}
                    onClick={() => {
                        addRouteDialogRef.current.handleClickOpenForCreate();
                    }}
                >
                    <AddIcon/>
                </Fab>
            </Tooltip>
        </Container>
    );
}

const mapStateToProps = (state) => {
    return {
        routes: state.firestore.ordered.routes,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => {
        return [
            {
                collection: 'routes',
            }
        ]
    })
)(withRouter(RoutesContainer))