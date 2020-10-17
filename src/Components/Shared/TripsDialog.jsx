import React, {Component, createRef} from 'react';
import {connect} from "react-redux";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Slide from "@material-ui/core/Slide";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import {addTrip, editRoute} from "../../Store/Actions/RouteActions";
import AlertDialog from "./AlertDialog";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import TextField from "@material-ui/core/TextField";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

class TripsDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            purpose: "Create",
            route: this.props.route,
            buses: this.props.buses,
            busNumber: null,
            day: null,
            startStation: null,
            endStation: null,
            arrival: Date.now(),
            duration: null,
        }
    }

    alertDialog = createRef();

    handleClickOpenForCreate = (route, buses) => {
        this.setState({
            purpose: "Create",
            open: true,
            route: route,
            buses: buses,
        })
    };

    handleClickOpenForEdit = (route) => {
        this.setState({
            open: true,
            purpose: "Edit",
            id: route.id,
            routeNumber: route.routeNumber,
            distance: route.distance,
            start: route.start,
            end: route.end,
            hours: route.hours,
            minutes: route.minutes,
            time: route.time,
        })
    };

    handleClose = () => {
        this.setState({
            open: false,
            purpose: "Create",
            distance: null,
            routeNumber: null,
            start: null,
            end: null,
            hours: null,
            minutes: null,
            time: null,
            fare: null,
            stations: []
        })
    };

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    submit = () => {
        let details = {
            id : Date.now(),
            busNumber: this.state.busNumber,
            day: this.state.day,
            startStation: this.state.startStation,
            endStation: this.state.endStation,
            arrival: this.state.arrival,
            duration: this.state.duration,
        }


        if (this.state.purpose === "Create") {
            this.props.addTrip(this.state.route.id, details, res => {
                if (res.status) {
                    this.props.handleSnackBar({
                        type: "SHOW_SNACKBAR",
                        msg: 'Trip Added Successfully!'
                    })
                    this.handleClose();
                } else {
                    this.alertDialog.current.handleClickOpen("Error Occurred!", `Something Went Wrong.Please Create Trip Again`)
                }
            })
        } else {
            this.props.editRoute(this.state.id, details, res => {
                if (res.status) {
                    this.props.handleSnackBar({
                        type: "SHOW_SNACKBAR",
                        msg: 'Route Edited Successfully!'
                    })
                    this.setState({
                        open: false,
                        purpose: "Create",
                        routeNumber: null,
                        start: null,
                        end: null,
                        hours: null,
                        minutes: null,
                        time: null,
                        fare: null,
                        stations: []
                    })
                } else {
                    this.alertDialog.current.handleClickOpen("Error Occurred!", `Something Went Wrong.Please Create Route Again`)
                }
            })
        }
    }

    getBuses = () => {

        let selectedBuses = [];
        this.state.buses && this.state.buses.map(bus => {
            if (bus.routeNumber === this.state.route.routeNumber) {
                selectedBuses.push(bus)
            }
        })
        return selectedBuses;
    }

    updateStartDate = (date) => {
        this.setState({
                arrival: date
            }
        )
    };

    render() {
        return (
            <React.Fragment>
                <AlertDialog ref={this.alertDialog}/>
                <Dialog
                    open={this.state.open}
                    aria-labelledby="form-dialog-title"
                    TransitionComponent={Transition}
                    maxWidth={"md"}
                    fullWidth={true}

                >
                    <DialogTitle id="form-dialog-title">{this.state.purpose} Trip</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={6}>
                                <FormControl variant="standard" fullWidth>
                                    <InputLabel id="demo-simple-select-outlined-label">Bus</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name={"busNumber"}
                                        value={this.state.busNumber}
                                        onChange={(e) => this.handleInput(e)}

                                    >
                                        <MenuItem value=""><em>None</em></MenuItem>
                                        {this.getBuses().map(bus => {
                                            return <MenuItem key={bus.busNumber}
                                                             value={bus.busNumber}>{bus.busNumber}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <FormControl variant="standard" fullWidth>
                                    <InputLabel id="demo-simple-select-outlined-label">Day</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name={"day"}
                                        value={this.state.day}
                                        onChange={(e) => this.handleInput(e)}

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
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={4}>
                                <FormControl variant="standard" fullWidth>
                                    <InputLabel id="demo-simple-select-outlined-label">Start Station</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name={"startStation"}
                                        value={this.state.startStation}
                                        onChange={(e) => this.handleInput(e)}

                                    >
                                        <MenuItem value=""><em>None</em></MenuItem>
                                        <MenuItem key={this.state.route.start}
                                                  value={this.state.route.start}>{this.state.route.start}</MenuItem>
                                        <MenuItem key={this.state.route.end}
                                                  value={this.state.route.end}>{this.state.route.end}</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                                <FormControl variant="standard" fullWidth>
                                    <InputLabel id="demo-simple-select-outlined-label">End Station</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name={"endStation"}
                                        value={this.state.endStation}
                                        onChange={(e) => this.handleInput(e)}
                                    >
                                        <MenuItem value=""><em>None</em></MenuItem>
                                        <MenuItem key={this.state.route.start}
                                                  value={this.state.route.start}>{this.state.route.start}</MenuItem>
                                        <MenuItem key={this.state.route.end}
                                                  value={this.state.route.end}>{this.state.route.end}</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                                <TextField
                                    type={"time"}
                                    id="arrival"
                                    name="arrival"
                                    label="Bus Number"
                                    fullWidth
                                    defaultValue={this.state.arrival}
                                    value={this.state.arrival}
                                    onChange={(e) => {
                                        this.handleInput(e)
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleClose()}>
                            Cancel
                        </Button>
                        <Button onClick={() => this.submit()}>
                            {this.state.purpose} Trip
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        handleSnackBar: (status) => dispatch(status),
        addTrip: (id, details, callback) => dispatch(addTrip(id, details, callback)),
        editRoute: (id, details, callback) => dispatch(editRoute(id, details, callback)),
    }
};

export default connect(null, mapDispatchToProps, null, {forwardRef: true})(TripsDialog)