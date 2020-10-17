import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {green, red, orange, blue, blueGrey, yellow} from "@material-ui/core/colors";
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import { Doughnut } from "react-chartjs-2";
import PieChartIcon from '@material-ui/icons/PieChart';

const useStyles = makeStyles((theme) => ({

    paperTop: {
        position: 'relative',
        width : "70px",
        height : "70px",
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



export default function PassengerTypeStatics (props) {
    const classes = useStyles();

    const data = {
        labels: [
            'Local Passengers',
            'Foreign Passengers',
        ],
        datasets: [{
            data: props.passengerCount,
            backgroundColor: [
                yellow[400],
                red[400]
            ],
            hoverBackgroundColor: [
                yellow[500],
                red[500]
            ]
        }]
    };

    const options = {
        legend: {
            labels: {
                fontColor: "#fff"
            }
        }
    }

    return(
        <React.Fragment>
            <Paper  style={{backgroundColor : blue[500]}}  elevation={5} className={classes.paperTop  + " hoverable"}>
                <Grid container justify={"center"} alignItems={"center"}>
                    <PieChartIcon fontSize={"large"}/>
                </Grid>
            </Paper>
            <Paper elevation={5} className={classes.paper + " hoverable"}>
                <Grid container justify={"center"}>
                    <Grid item>
                        <Typography style={{marginBottom : "20px"}} variant={"h5"} color={"textSecondary"} align={"center"}>
                            Passenger Statistics
                        </Typography>
                    </Grid>
                    <Doughnut data={data} options={options} />
                </Grid>
            </Paper>
        </React.Fragment>
    )
}
