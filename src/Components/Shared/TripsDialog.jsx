/*
 *      Class Name   -   TripsDialog
 *      Author          -   Ashen Senevirathne
 *      IT Number       -   IT18178678
 *
 */
import React, {Component, createRef} from 'react';

/*
* Components
*/
import AlertDialog from "./AlertDialog";

/*
* MUI Components
*/
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from "@material-ui/core/FormControl";
import Grid from '@material-ui/core/Grid';
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Slide from "@material-ui/core/Slide";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";

/*
* Redux Configurations
*/
import {connect} from "react-redux";

/*
* Redux Functions
*/
import {addTrip, editTrip} from "../../Store/Actions/RouteActions";

/*
* Validations
*/
import tripsValidations from "../../Functions/Validations/TripsValidations/tripsValidations";


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
            trip: this.props.trip,
            busNumber: "",
            day: "",
            startStation: "",
            endStation: "",
            arrival: "",
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

    handleClickOpenForEdit = (route, buses, trip) => {
        this.setState({
            open: true,
            purpose: "Edit",
            route: route,
            buses: buses,
            trip: trip,
            busNumber: trip.busNumber,
            day: trip.day,
            startStation:trip.startStation,
            endStation: trip.endStation,
            arrival: trip.arrival,
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
            busNumber: this.state.busNumber,
            day: this.state.day,
            startStation: this.state.startStation,
            endStation: this.state.endStation,
            arrival: this.state.arrival,
        }


        const result = tripsValidations(details);

        if (result.status) {
            if (this.state.purpose === "Create") {
                this.props.addTrip(this.state.route.id, {...details, id: Date.now()}, res => {
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
                this.props.editTrip(this.state.route.id, {...details, id: this.state.trip.id}, res => {
                    if (res.status) {
                        this.props.handleSnackBar({
                            type: "SHOW_SNACKBAR",
                            msg: 'Trip Updated Successfully!'
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
                        this.alertDialog.current.handleClickOpen("Error Occurred!", `Something Went Wrong.Please Update Trip Again`)
                    }
                })
            }
        } else {
            this.alertDialog.current.handleClickOpen("Form Validation Error!", result.error);
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
                                    label="Arrival Time"
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

/*
* Firestore Connection
*/
const mapDispatchToProps = (dispatch) => {
    return {
        handleSnackBar: (status) => dispatch(status),
        addTrip: (id, details, callback) => dispatch(addTrip(id, details, callback)),
        editTrip: (id, details, callback) => dispatch(editTrip(id, details, callback)),
    }
};

export default connect(null, mapDispatchToProps, null, {forwardRef: true})(TripsDialog)