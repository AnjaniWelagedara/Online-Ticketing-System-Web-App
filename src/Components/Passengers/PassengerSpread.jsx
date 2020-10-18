/*Registration Number: IT18180626
Author: H.M.A.N.Welagedara
Group Number: 2020-REG-WE-20*/
import React from 'react';
import {blue, yellow} from "@material-ui/core/colors";
import Paper from "@material-ui/core/Paper";
import getLabels from "../../Functions/GetLabels/getLabels";
import GetPassengerCountByYear from "./getPassengerCountByYear";
import Grid from "@material-ui/core/Grid";
import {Line} from 'react-chartjs-2';
import {makeStyles} from "@material-ui/core/styles";
import TimelineIcon from '@material-ui/icons/Timeline';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    paperTop: {
        position: 'relative',
        width: "70px",
        height: "70px",
        zIndex: 2,
        color: "white",
        marginLeft: theme.spacing(3),
        padding: theme.spacing(2),
    },
    paper: {
        position: 'relative',
        zIndex: 1,
        marginTop: -theme.spacing(4),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
    },
}));

/*graph for the passenger count*/

export default function PassengerTypeStatics(props) {
    const classes = useStyles();
    const passengers = props.passengers;

    const data = {
        labels: getLabels(passengers),
        datasets: [
            {
                label: 'Registrations by Year',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: yellow[500],
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: GetPassengerCountByYear(passengers)
            }
        ]
    };

    return (
        <div>
            <Paper style={{backgroundColor: blue[500]}} elevation={5} className={classes.paperTop + " hoverable"}>
                <Grid container justify={"center"} alignItems={"center"}>
                    <TimelineIcon fontSize={"large"}/>
                </Grid>
            </Paper>
            <Paper elevation={5} className={classes.paper + " hoverable"}>
                <Grid container justify={"center"}>
                    <Grid item>
                        <Typography style={{marginBottom: "20px"}} variant={"h5"} color={"textSecondary"}
                                    align={"center"}>
                            Passenger Spread Statistics
                        </Typography>
                    </Grid>
                    <Line data={data}/>
                </Grid>
            </Paper>
        </div>
    );
}