import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Line} from 'react-chartjs-2';
import Paper from "@material-ui/core/Paper";
import {blue, yellow} from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import TimelineIcon from '@material-ui/icons/Timeline';
import getLabels from "../../Functions/GetLabels/getLabels";
import GetPassengerCountByYear from "../Passengers/getPassengerCountByYear";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

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



export default function NetworkTraffic(props) {
    const classes = useStyles();
    const routes = props.routes;
    const triplogs = props.triplogs;

    const [data, setData] = useState({});
    const [route, setRoute] = useState({});
    const [day, setDay] = useState({});


    function compare( a, b ) {
        if ( a.arrival < b.arrival ){
            return -1;
        }
        if ( a.arrival > b.arrival ){
            return 1;
        }
        return 0;
    }

    const setNetworkTraffic = () => {
        let selectedRoute;
        let selectedTrips = [];
        let labels = [];
        let passengerCount = [];

        routes.map(r => {
            if (r.routeNumber === route){
                selectedRoute = r;
            }
        })

        selectedRoute.trips.map(trip => {
            if(trip.day === day){
                selectedTrips.push(trip)
            }
        })

        selectedTrips.sort( compare );

        selectedTrips.map(trip => {
            labels.push(trip.arrival);
            let count = 0;
            triplogs.map(tri => {
                console.log("t",tri)
                if(trip.id == tri.tripId){
                    ++count;
                }
            })
            passengerCount.push(count)
        })


        setData({
                labels: labels,
                datasets: [
                    {
                        label: 'Route Traffic with Passenger Count',
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
                        data: passengerCount
                    }
                ]
            }
        )
    }


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
                            Route Traffic
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2} style={{marginTop: "10px", marginBottom: "20px"}}>
                    <Grid item xs={12} sm={12} md={4}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel id="demo-simple-select-outlined-label">Route Number</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name={"routeNumber"}
                                value={route}
                                onChange={e => setRoute(e.target.value)}

                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                {routes && routes.map(route => {
                                    return <MenuItem key={route.id}
                                                     value={route.routeNumber}>{route.routeNumber}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel id="demo-simple-select-outlined-label">Day</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name={"day"}
                                value={day}
                                onChange={e => setDay(e.target.value)}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                <MenuItem key={"Monday"} value={"Monday"}>Monday</MenuItem>
                                <MenuItem key={"Tuesday"} value={"Tuesday"}>Tuesday</MenuItem>
                                <MenuItem key={"Wednesday"} value={"Wednesday"}>Wednesday</MenuItem>
                                <MenuItem key={"Thursday"} value={"Thursday"}>Thursday</MenuItem>
                                <MenuItem key={"Friday"} value={"Friday"}>Friday</MenuItem>
                                <MenuItem key={"Saturday"} value={"Saturday"}>Saturday</MenuItem>
                                <MenuItem key={"Sunday"} value={"Sunday"}>Sunday</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <Button
                            style={{marginTop : "15px", color : "#fff"}}
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<SearchIcon />}
                            onClick={() => {
                                setNetworkTraffic()
                            }}
                        >
                            Get Count
                        </Button>
                    </Grid>
                </Grid>

                <Line data={data}/>
            </Paper>
        </div>
    );
}