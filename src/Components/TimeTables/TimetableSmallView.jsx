import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Link} from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import {deepPurple} from '@material-ui/core/colors';
import Grid from "@material-ui/core/Grid";
import VisibilityIcon from '@material-ui/icons/Visibility';

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

export default function TimetableSmallView(props) {
    const classes = useStyles();
    const timetable = props.timetable;

    return (
        <Grid item xs={12} sm={6} md={4} lg={4} container justify={"center"}>
            <Card className={classes.root + " hoverable"}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {`${timetable.station1.charAt(0).toUpperCase()}${timetable.station2.charAt(0).toUpperCase()}`}
                        </Avatar>
                    }
                    title={timetable.routeNumber}
                    subheader={`${timetable.station1} - ${timetable.station2}`}
                />
                <CardActions disableSpacing>
                    <IconButton
                        component={Link} to={`/dashboard/timetable/${timetable.id}`}
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


