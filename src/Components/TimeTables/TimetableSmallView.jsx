import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Link} from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import {yellow} from '@material-ui/core/colors';
import Grid from "@material-ui/core/Grid";
import VisibilityIcon from '@material-ui/icons/Visibility';
import Chip from "@material-ui/core/Chip";
import TimelineIcon from "@material-ui/icons/Timeline";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import CardContent from "@material-ui/core/CardContent";

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

export default function TimetableSmallView(props) {
    const classes = useStyles();
    const route = props.route;

    return (
        <Grid item xs={12} sm={6} md={4} lg={4} container justify={"center"}>
            <Card className={classes.root + " hoverable"}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {`${route.start.charAt(0).toUpperCase()}${route.end.charAt(0).toUpperCase()}`}
                        </Avatar>
                    }
                    title={route.routeNumber}
                    subheader={`${route.start} - ${route.end}`}
                />
                <CardContent>
                    <Grid container spacing={1}>
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
                        component={Link} to={`/dashboard/timetable/${route.id}`}
                        style={{marginLeft : "auto"}}
                        color={"primary"}
                    >
                        <VisibilityIcon/>
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
}


