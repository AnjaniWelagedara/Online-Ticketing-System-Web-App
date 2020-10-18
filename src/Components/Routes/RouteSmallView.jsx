/*
 *      function Name   -   RouteSmallView
 *      Author          -   Ashen Senevirathne
 *      IT Number       -   IT18178678
 *
 */
import React, {useRef} from 'react';

/*
* Components
*/
import ConfirmDialog from "../Shared/ConfirmDialog";
import RouteDialog from "../Shared/RouteDialog";

/*
* MUI Components
*/

import {makeStyles} from '@material-ui/core/styles';
import {yellow} from '@material-ui/core/colors';

import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from "@material-ui/core/Grid";
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import IconButton from '@material-ui/core/IconButton';
import TimelineIcon from '@material-ui/icons/Timeline';
import Typography from '@material-ui/core/Typography';

/*
* Redux Configurations
*/
import {connect} from "react-redux";

/*
* Redux Functions
*/
import {deleteRoute} from "../../Store/Actions/RouteActions";

/*
* MUI Styles
*/
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
        backgroundColor: yellow[600],
        color: '#fff'
    },
}));

function RouteSmallView(props) {
    const classes = useStyles();
    const confirmDialogRef = useRef();
    const [expanded, setExpanded] = React.useState(false);
    const route = props.route;
    const routeDialogRef = useRef();

    const deleteRoute = () => {
        props.deleteRoute(route.id, res => {
            if (res.status) {
                props.handleSnackBar({
                    type: "SHOW_SNACKBAR",
                    msg: 'Route Deleted Successfully!'
                })
            } else {
                props.handleSnackBar({
                    type: "SHOW_SNACKBAR",
                    msg: 'Something Went Wrong.Please Delete Route Again!'
                })
            }
        })
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Grid item xs={12} sm={6} md={4} lg={4} container justify={"center"}>
            <ConfirmDialog ref={confirmDialogRef} deleteRoute={deleteRoute}/>
            <RouteDialog ref={routeDialogRef}/>
            <Card className={classes.root + " hoverable"}>
                <CardHeader
                    avatar={
                        <Avatar  aria-label="recipe" className={classes.avatar}>
                            {`${route.start.charAt(0).toUpperCase()}${route.end.charAt(0).toUpperCase()}`}
                        </Avatar>
                    }
                    title={route.routeNumber}
                    subheader={`${route.start} - ${route.end}`}
                />
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Chip variant="outlined" size={"small"} label={`Distance - ${route.distance} Km`}
                                  icon={<TimelineIcon/>}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Chip variant="outlined" size={"small"} label={`Fare for Km - Rs:${route.fare}.00/-`}
                                  icon={<AttachMoneyIcon/>}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Chip variant="outlined" size={"small"}
                                  label={`Duration - ${route.hours} Hours ${route.minutes} Minutes`}
                                  icon={<AccessTimeIcon/>}/>
                        </Grid>
                    </Grid>
                    <hr/>
                </CardContent>
                <CardActions disableSpacing style={{marginTop : "-30px"}}>
                    <IconButton
                        aria-label="add to favorites"
                        style={{color: "green"}}
                        onClick={() => {
                            routeDialogRef.current.handleClickOpenForEdit(route)
                        }}
                    >
                        <CreateIcon/>
                    </IconButton>
                    <IconButton
                        onClick={() => {
                            confirmDialogRef.current.handleClickOpen(
                                "Do you need to delete the Route?",
                                `By confirming this, You give permission to delete Route.Note that this process can not be revert!`,
                                "deleteRoute"
                            );
                        }}
                        aria-label="share" color={"secondary"}>
                        <DeleteIcon/>
                    </IconButton>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon/>
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography gutterBottom={true} variant={"body1"}>Stations</Typography>
                        {route.stations.map(station => {
                            return <Chip
                                style={{margin : "5px"}}
                                variant="outlined"
                                size={"small"}
                                label={station.start + " - " + station.end + " (" + station.distance + " Km)"}
                                icon={<HomeWorkIcon/>}/>
                        })}
                    </CardContent>
                </Collapse>
            </Card>
        </Grid>
    );
}

/*
* Firestore Connection
*/
const mapStateToProps = (state) => {
    return {
        email: state.firebase.auth.email
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleSnackBar: (status) => dispatch(status),
        deleteRoute: (id, callback) => dispatch(deleteRoute(id, callback)),

    }
};

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(RouteSmallView)
