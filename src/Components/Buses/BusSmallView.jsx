import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AirlineSeatReclineNormalIcon from '@material-ui/icons/AirlineSeatReclineNormal';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import BusesDialog from "../Shared/BusesDialog";
import CardActions from '@material-ui/core/CardActions';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import ConfirmDialog from "../Shared/ConfirmDialog";
import {connect} from "react-redux";
import CardContent from '@material-ui/core/CardContent';
import CreateIcon from '@material-ui/icons/Create';
import {deleteBus} from "../../Store/Actions/BusActions";
import {deepPurple} from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import Grid from "@material-ui/core/Grid";
import IconButton from '@material-ui/core/IconButton';
import {makeStyles} from '@material-ui/core/styles';
import React, {useRef} from 'react';
import TimelineIcon from '@material-ui/icons/Timeline';
import Typography from '@material-ui/core/Typography';

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
        backgroundColor: deepPurple[500],
        color: '#fff'
    },
}));
/*Showing small cards with bus details*/
function BusSmallView(props) {
    const classes = useStyles();
    const confirmDialogRef = useRef();
    const updateBusesDialogRef = useRef();
    const bus = props.bus;
    const routes = props.routes;

/*Function to delete a bus*/
    const deleteBus = () => {
        props.deleteBus(bus.id, res => {
            if (res.status) {
                props.handleSnackBar({
                    type: "SHOW_SNACKBAR",
                    msg: 'Bus Deleted Successfully!'
                })
            } else {
                props.handleSnackBar({
                    type: "SHOW_SNACKBAR",
                    msg: 'Something Went Wrong.Please Delete Bus Again!'
                })
            }
        })
    }


    return (
        <Grid item xs={12} sm={6} md={4} lg={4} container justify={"center"}>
            <ConfirmDialog ref={confirmDialogRef} deleteBus={deleteBus}/>
            <BusesDialog ref={updateBusesDialogRef} bus={bus}/>
            <Card className={classes.root + " hoverable"}>
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Typography color={"primary"} align={"center"} variant={"h5"}>{bus.busNumber}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Chip variant="outlined" size={"small"}
                                  label={`Route Number - ${bus.routeNumber}`}
                                  icon={<TimelineIcon/>}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Chip variant="outlined" size={"small"}
                                  label={`Condition - ${bus.type}`}
                                  icon={<AssignmentLateIcon/>}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Chip variant="outlined" size={"small"}
                                  label={`Sheets - ${bus.sheets}`}
                                  icon={<AirlineSeatReclineNormalIcon/>}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Chip  variant="outlined" size={"small"}
                                  label={`Pass Code - ${bus.passcode}`}
                                  icon={<DeveloperModeIcon/>}/>
                        </Grid><Grid item xs={12}>
                            <Chip
                                variant="outlined" size={"small"}
                                  label={`Driver - ${bus.driver}`}
                                  icon={<AccountBoxIcon/>}/>
                        </Grid>
                    </Grid>
                    <hr/>
                </CardContent>
                <CardActions disableSpacing style={{marginTop : "-30px"}}>
                    <IconButton
                        aria-label="add to favorites"
                        style={{color: "green", marginLeft : "auto"}}
                        onClick={() => {
                            updateBusesDialogRef.current.handleClickOpenForEdit(bus, routes)
                        }}
                    >
                        <CreateIcon/>
                    </IconButton>
                    <IconButton
                        onClick={() => {
                            confirmDialogRef.current.handleClickOpen(
                                `Do you need to delete the Bus : ${bus.busNumber}?`,
                                `By confirming this, You give permission to delete Bus.Note that this process can not be revert!`,
                                "deleteBus"
                            );
                        }}
                        aria-label="share" color={"secondary"}>
                        <DeleteIcon/>
                    </IconButton>
                </CardActions>

            </Card>
        </Grid>
    );
}

/*Connection for the firebase*/

const mapDispatchToProps = (dispatch) => {
    return {
        handleSnackBar: (status) => dispatch(status),
        deleteBus: (id, callback) => dispatch(deleteBus(id, callback)),
    }
};

export default connect(null, mapDispatchToProps, null, {forwardRef: true})(BusSmallView)
