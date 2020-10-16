import React, {useRef} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import {deepPurple, yellow} from '@material-ui/core/colors';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from "@material-ui/core/Grid";
import {connect} from "react-redux";
import Chip from '@material-ui/core/Chip';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import TimelineIcon from '@material-ui/icons/Timeline';
import AirlineSeatReclineNormalIcon from '@material-ui/icons/AirlineSeatReclineNormal';
import ScheduleIcon from '@material-ui/icons/Schedule';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        margin: "20px",
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: yellow[500],
        color: '#fff'
    },
}));

function BusSmallView(props) {
    const classes = useStyles();
    const trip = props.trip;


    return (
        <Grid item xs={12} sm={6} md={4} lg={4} container justify={"center"}>
            <Card className={classes.root + " hoverable"}>
                <CardHeader
                    avatar={
                        <Avatar  aria-label="recipe" className={classes.avatar}>
                            {`${trip.startStation.charAt(0).toUpperCase()}${trip.endStation.charAt(0).toUpperCase()}`}
                        </Avatar>
                    }
                    title={`${trip.startStation} - ${trip.endStation}`}
                />
                <CardContent>
                    <Grid container spacing={1}>

                        <Grid item xs={6}>
                            <Chip variant="outlined" size={"small"}
                                  label={`Bus - ${trip.busNumber}`}
                                  icon={<DirectionsBusIcon/>}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Chip  variant="outlined" size={"small"}
                                   label={`Arrival - ${trip.arrival}`}
                                   icon={<ScheduleIcon/>}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Chip variant="outlined" size={"small"}
                                  label={`From - ${trip.startStation}`}
                                  icon={<HomeWorkIcon/>}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Chip variant="outlined" size={"small"}
                                  label={`To - ${trip.endStation}`}
                                  icon={<HomeWorkIcon/>}/>
                        </Grid>

                    </Grid>
                    <hr/>
                </CardContent>
                <CardActions disableSpacing style={{marginTop : "-30px"}}>
                    <IconButton
                        aria-label="add to favorites"
                        style={{color: "green", marginLeft : "auto"}}

                    >
                        <CreateIcon/>
                    </IconButton>
                    <IconButton
                        aria-label="share" color={"secondary"}>
                        <DeleteIcon/>
                    </IconButton>
                </CardActions>

            </Card>
        </Grid>
    );
}



const mapDispatchToProps = (dispatch) => {
    return {
        handleSnackBar: (status) => dispatch(status),
    }
};

export default connect(null, mapDispatchToProps, null, {forwardRef: true})(BusSmallView)
