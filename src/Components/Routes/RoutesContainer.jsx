/*
 *      function Name   -   RoutesContainer
 *      Author          -   Ashen Senevirathne
 *      IT Number       -   IT18178678
 *
 */
import React, {useRef} from "react";

/*
* Components
*/
import RouteDialog from "../Shared/RouteDialog";
import RouteSmallView from "./RouteSmallView";

/*
* MUI Components
*/
import {makeStyles} from '@material-ui/core/styles';

import AddIcon from '@material-ui/icons/Add';
import Container from "@material-ui/core/Container";
import Fab from '@material-ui/core/Fab';
import Grid from "@material-ui/core/Grid";
import Tooltip from '@material-ui/core/Tooltip';
import Typography from "@material-ui/core/Typography";

/*
* Redux Configurations
*/
import {compose} from "redux";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {withRouter} from "react-router-dom";

/*
* Redux Functions
*/
import {deleteRoute} from "../../Store/Actions/RouteActions";

/*
* MUI Styles
*/
const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(3),
        right: theme.spacing(3),
    }
}));

/*
* MUI Styles
*/
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

/*
* Firestore Connection
*/

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