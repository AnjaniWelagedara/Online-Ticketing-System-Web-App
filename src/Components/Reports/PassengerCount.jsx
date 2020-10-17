import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Doughnut, Line} from 'react-chartjs-2';
import Paper from "@material-ui/core/Paper";
import {blue, red, yellow} from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import SearchIcon from '@material-ui/icons/Search';
import TimelineIcon from '@material-ui/icons/Timeline';
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

export default function PassengerCount(props) {
    const classes = useStyles();
    const routes = props.routes;
    const triplogs = props.triplogs;
    const buses = props.buses;

    const [data, setData] = useState({

        datasets: [{
            data: [60],
            backgroundColor: [
                yellow[400],
            ],
            hoverBackgroundColor: [
                yellow[500],
            ]
        }]
    });
    const [route, setRoute] = useState(null);
    const [day, setDay] = useState(null);
    const [arrival, setArrival] = useState(null);


    function compare(a, b) {
        if (a.arrival < b.arrival) {
            return -1;
        }
        if (a.arrival > b.arrival) {
            return 1;
        }
        return 0;
    }

    const options = {
        legend: {
            labels: {
                fontColor: "#fff"
            }
        }
    }

    const getTrips = () => {
        let selectedRoute;
        let selectedTrips = [];

        routes.map(r => {
            if (r.routeNumber === route) {
                selectedRoute = r;
            }
        })

        selectedRoute.trips.map(trip => {
            if (trip.day === day) {
                selectedTrips.push(trip)
            }
        })

        selectedTrips.sort(compare);

        return selectedTrips;
    }

    const setPassengerCount = () => {
        let selectedRoute, selectedTrip, sheetCount;

        routes.map(r => {
            if (r.routeNumber === route) {
                selectedRoute = r;
            }
        });

        selectedRoute.trips.map(trip => {
            if (trip.day === day && trip.arrival == arrival) {
                selectedTrip = trip
            }
        });

        let passengerCount = 0;
        triplogs.map(tri => {
            console.log("t", tri)
            if (selectedTrip.id == tri.tripId) {
                ++passengerCount;
            }
        });

        buses.map(bus => {
            if(bus.busNumber === selectedTrip.busNumber){
                sheetCount = bus.sheets;
            }
        })

        setData({
                labels: [
                    `Sheets Count ${selectedTrip.busNumber}`,
                    'Passengers Count',
                ],
                datasets: [{
                    data:[sheetCount, passengerCount],
                    backgroundColor: [
                        yellow[400],
                        red[400]
                    ],
                    hoverBackgroundColor: [
                        yellow[500],
                        red[500]
                    ]
                }]
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
                            Passenger Count
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2} style={{marginTop: "10px", marginBottom: "20px"}}>
                    <Grid item xs={12} sm={12} md={6}>
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
                    <Grid item xs={12} sm={12} md={6}>
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
                    {(!route || !day)
                        ? <Grid item xs={12} sm={12} md={6}>
                            <FormControl variant="standard" fullWidth>
                                <InputLabel id="demo-simple-select-outlined-label">Trip</InputLabel>
                                <Select
                                    disabled
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
                        </Grid> :
                        <Grid item xs={12} sm={12} md={6}>
                            <FormControl variant="standard" fullWidth>
                                <InputLabel id="demo-simple-select-outlined-label">Trip</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    value={arrival}
                                    onChange={e => setArrival(e.target.value)}
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    {getTrips().map(trip => {
                                        return <MenuItem key={trip.arrival}
                                                         value={trip.arrival}>{trip.arrival}</MenuItem>
                                    })}

                                </Select>
                            </FormControl>
                        </Grid>
                    }
                    <Grid item xs={12} sm={12} md={6}>
                        <Button
                            style={{marginTop: "15px", color: "#fff"}}
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<SearchIcon/>}
                            onClick={() => {
                                setPassengerCount()
                            }}
                        >
                            Get Count
                        </Button>
                    </Grid>
                </Grid>

                <Doughnut data={data} options={options}/>
            </Paper>
        </div>
    );
}