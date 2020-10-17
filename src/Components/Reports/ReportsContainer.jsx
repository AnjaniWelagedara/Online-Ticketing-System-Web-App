import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import PassengerCount from "./PassengerCount";
import NetworkTraffic from "./NetworkTraffic";
import {compose} from "redux";
import {connect} from "react-redux";
import {firestoreConnect, isLoaded} from "react-redux-firebase";
import {withRouter} from "react-router-dom";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";

function ReportsContainer(props) {
    let {routes, triplogs, buses} = props;
    return (
        <div>
            {(!isLoaded(routes, triplogs, buses))
                ? <Backdrop open={true}>
                    <CircularProgress style={{color: "#fff"}}/>
                </Backdrop>
                :
                <Container
                    maxWidth="lg"
                >
                    <Grid container spacing={3}>
                        <Grid xs={5} item>
                            <PassengerCount routes={routes} triplogs={triplogs} buses={buses}/>
                        </Grid>
                        <Grid xs={7} item>
                            <NetworkTraffic routes={routes} triplogs={triplogs}/>
                        </Grid>
                    </Grid>

                </Container>
            }

        </div>
    );
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        routes: state.firestore.ordered.routes,
        triplogs: state.firestore.ordered.triplogs,
        buses: state.firestore.ordered.buses,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => {
        return [
            {
                collection: 'routes'
            }, {
                collection: 'triplogs'
            }, {
                collection: 'buses'
            },

        ]
    })
)(withRouter(ReportsContainer))