import React from "react";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import {compose} from "redux";
import {connect} from "react-redux";
import Container from "@material-ui/core/Container";
import {firestoreConnect, isLoaded} from "react-redux-firebase";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import {withRouter} from "react-router-dom";
import AllPassengerTable from "./AllPassengerTable";
import PassengerTypeStatics from "./PassengerTypeStatics";
import PassengerSpread from "./PassengerSpread";

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
function PassengersContainer(props) {
    const classes = useStyles();
    let {passengers} = props;

    const getPassengerCount = () => {
        let localCount = 0;
        let ForeignCount = 0;
        passengers.map(p => {
            if (p.passengerType === "Local") {
                ++localCount;
            } else {
                ++ForeignCount;
            }
        })
        let passengerCount = [localCount, ForeignCount];
        return passengerCount;
    }

    return (
        <React.Fragment>
            {(!isLoaded(passengers))
                ? <Backdrop open={true}>
                    <CircularProgress style={{color: "#fff"}}/>
                </Backdrop>
                :
                <Container
                    maxWidth="lg"
                    style={{marginBottom: "50px", marginTop: "50px"}}
                >
                    <Grid container style={{marginTop: "50px"}} spacing={3}>
                        <Grid xs={12} item>
                            <Typography align={"center"} variant={"h4"} gutterBottom>
                                All Passengers
                            </Typography>
                            <AllPassengerTable passengers={passengers}/>
                        </Grid>
                        <Grid xs={5} item style={{marginTop: "20px"}}>
                            <PassengerTypeStatics passengerCount={getPassengerCount()}/>
                        </Grid>
                        <Grid xs={7} item style={{marginTop: "20px"}}>
                            <PassengerSpread passengers={passengers}/>
                        </Grid>
                    </Grid>

                </Container>
            }
        </React.Fragment>
    )
}

/*Connect firebase*/
const mapStateToProps = (state) => {
    return {
        passengers: state.firestore.ordered.Passengers,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => {
        return [
            {
                collection: 'Passengers'
            }
        ]
    })
)(withRouter(PassengersContainer))