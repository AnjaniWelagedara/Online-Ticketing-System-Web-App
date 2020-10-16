import React, {useRef} from "react";
import {makeStyles, useTheme} from '@material-ui/core/styles';
import TimetableSmallView from "./TimetableSmallView";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {compose} from "redux";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {withRouter} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(3),
        right: theme.spacing(3),
    }
}));

function TimetablesContainer(props) {
    const classes = useStyles();
    let routes = props.routes;

    return (
        <Container
            maxWidth="lg"
            style={{marginBottom: "50px", marginTop: "50px"}}
        >
            <Grid container style={{marginTop: "50px"}}>
                <Grid xs={12} item>
                    <Typography align={"center"} variant={"h4"} gutterBottom>
                        All Timetables
                    </Typography>
                </Grid>
            </Grid>

            <Grid container direction={"row"}>
                {routes && routes.map(route => {
                    return <TimetableSmallView key={route.id} route={route} />
                })}
            </Grid>
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
            },

        ]
    })
)(withRouter(TimetablesContainer))