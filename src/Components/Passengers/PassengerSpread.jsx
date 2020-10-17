import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Line} from 'react-chartjs-2';
import Paper from "@material-ui/core/Paper";
import {blue, yellow} from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TimelineIcon from '@material-ui/icons/Timeline';

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

export default function PassengerTypeStatics(props) {
    const classes = useStyles();
    const passengers = props.passengers;

    const getLabels = () => {
        let flags = [], output = [], l = passengers.length, i;
        for( i=0; i<l; i++) {
            if( flags[passengers[i].registeredDate]) continue;
            flags[passengers[i].registeredDate] = true;
            output.push(passengers[i].registeredDate);
        }
        return output;
    }

    const getPassengerCountByYear = () => {
        let passengerCount = [];
        getLabels().map(year => {
            let count = 0;
            passengers.map(p => {
                if(p.registeredDate === year){
                    ++count;
                }
            })
            passengerCount.push(count);
        })
        return passengerCount;
    }

    const data = {
        labels: getLabels(),
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
                data: getPassengerCountByYear()
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