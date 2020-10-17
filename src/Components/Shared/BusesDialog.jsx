import {addBus, editBus} from "../../Store/Actions/BusActions";
import AlertDialog from "./AlertDialog";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import React, {Component, createRef} from "react";
import Select from "@material-ui/core/Select";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

class BusesDialog extends Component {
/*Attributes in a bus*/
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            purpose: "Create",
            id : null,
            routes: this.props.routes,
            busNumber: null,
            type: null,
            sheets: null,
            routeNumber: null,
            driver: null,
            passcode: null,
        }
    }

    alertDialog = createRef();

/*Function for create model*/
    handleClickOpenForCreate = (routes) => {
        this.setState({
            purpose: "Create",
            open: true,
            routes: routes
        })
    };
    /*Function for edit model*/
    handleClickOpenForEdit = (bus, routes) => {
        this.setState({
            open: true,
            purpose: "Edit",
            id : bus.id,
            routes: routes,
            busNumber: bus.busNumber,
            type: bus.type,
            sheets: bus.sheets,
            routeNumber: bus.routeNumber,
            driver: bus.driver,
            passcode: bus.passcode,
        })
    };
    /*Function for close model*/
    handleClose = () => {
        this.setState({
            open: false,
            purpose: "Create",
            id : null,
            routes: this.props.routes,
            busNumber: null,
            type: null,
            sheets: null,
            routeNumber: null,
            driver: null,
            passcode: null,
        })
    };
    /*Function for input attributes*/
    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    /*Function for submit model*/
    submit = () => {
        let details = {
            busNumber: this.state.busNumber,
            routeNumber: this.state.routeNumber,
            type: this.state.type,
            sheets: this.state.sheets,
            driver: this.state.driver,
            passcode: this.state.passcode
        }

        if(this.state.purpose === "Create"){
            this.props.addBus(details, res => {
                if (res.status) {
                    this.props.handleSnackBar({
                        type: "SHOW_SNACKBAR",
                        msg: 'Bus Added Successfully!'
                    })
                    this.handleClose()
                } else {
                    this.alertDialog.current.handleClickOpen("Error Occurred!", `Something Went Wrong.Please Create Bus Again`)
                }
            })
        }else {
            this.props.editBus(this.state.id, details, res => {
                if (res.status) {
                    this.props.handleSnackBar({
                        type: "SHOW_SNACKBAR",
                        msg: 'Bus Edited Successfully!'
                    })
                    this.handleClose()
                } else {
                    this.alertDialog.current.handleClickOpen("Error Occurred!", `Something Went Wrong.Please Update Bus Again`)
                }
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                {<AlertDialog ref={this.alertDialog}/>}
                <Dialog
                    open={this.state.open}
                    aria-labelledby="form-dialog-title"
                    TransitionComponent={Transition}
                    maxWidth={"md"}
                    fullWidth={true}

                >
                    <DialogTitle id="form-dialog-title"> Route</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={4}>
                                <TextField
                                    id="busNumber"
                                    name="busNumber"
                                    label="Bus Number"
                                    fullWidth
                                    value={this.state.busNumber}
                                    onChange={(e) => {
                                        this.handleInput(e)
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                                <FormControl variant="standard" fullWidth>
                                    <InputLabel id="demo-simple-select-outlined-label">Route Number</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name={"routeNumber"}
                                        value={this.state.routeNumber}
                                        onChange={(e) => this.handleInput(e)}

                                    >
                                        <MenuItem value=""><em>None</em></MenuItem>
                                        {this.state.routes && this.state.routes.map(route => {
                                            return <MenuItem key={route.id}
                                                             value={route.routeNumber}>{route.routeNumber}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                                <FormControl variant="standard" fullWidth>
                                    <InputLabel id="demo-simple-select-outlined-label">Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name={"type"}
                                        value={this.state.type}
                                        onChange={(e) => this.handleInput(e)}

                                    >
                                        <MenuItem value=""><em>None</em></MenuItem>
                                        <MenuItem key={"Non A/C"} value={"Non A/C"}>{"Non A/C"}</MenuItem>
                                        <MenuItem key={"A/C"} value={"A/C"}>{" A/C"}</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={4}>
                                <TextField
                                    type={"number"}
                                    id="sheets"
                                    name="sheets"
                                    label="Sheets Count"
                                    fullWidth
                                    value={this.state.sheets}
                                    onChange={(e) => {
                                        this.handleInput(e)
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                                <TextField
                                    id="driver"
                                    name="driver"
                                    label="Driver Name"
                                    fullWidth
                                    value={this.state.driver}
                                    onChange={(e) => {
                                        this.handleInput(e)
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                                <TextField
                                    type={"number"}
                                    id="passcode"
                                    name="passcode"
                                    label="Passcode"
                                    fullWidth
                                    value={this.state.passcode}
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
                            {this.state.purpose} Bus
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
        addBus: (details, callback) => dispatch(addBus(details, callback)),
        editBus: (id, details, callback) => dispatch(editBus(id, details, callback)),
    }
};
export default connect(null, mapDispatchToProps, null, {forwardRef: true})(BusesDialog)

