import React, {useRef} from "react";
import {makeStyles, useTheme} from '@material-ui/core/styles';
import TimetableSmallView from "./TimetableSmallView";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import RouteDialog from "../Shared/RouteDialog";
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
    let timetables = props.timetables;

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
                        All Timetables
                    </Typography>
                </Grid>
            </Grid>

            <Grid container direction={"row"}>
                {timetables && timetables.map(timetable => {
                    return <TimetableSmallView key={timetable.id} timetable={timetable} />
                })}
            </Grid>
        </Container>
    );
}

const mapStateToProps = (state) => {
    return {
        timetables: state.firestore.ordered.timetables,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => {
        return [
            {
                collection: 'timetables',
            }
        ]
    })
)(withRouter(TimetablesContainer))