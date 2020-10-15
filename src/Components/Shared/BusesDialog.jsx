
import React, {Component, createRef} from "react";
// import AlertDialog from "./AlertDialog";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import ChipInput from "material-ui-chip-input";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {addBus} from "../../Store/Actions/BusActions";
import AlertDialog from "./AlertDialog";
import {connect} from "react-redux";
//import {addRoute, editRoute} from "../../Store/Actions/RouteActions";

// import Transition from "react-transition-group/Transition";
class BusesDialog extends Component{

    constructor(props) {
        super(props);
        this.state={
            open: false,
            purpose: "Create",
            busNumber:""

        }
    }

    alertDialog = createRef();


    handleClickOpenForCreate = () => {
        this.setState({
            purpose: "Create",
            open: true,
            busNumber:""
        })
    };

    handleClose = () => {
        this.setState({
            open: false,
            purpose: "Create",

        })
    };

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submit =()=>{
        let details={
            busNumber: this.state.busNumber
        }

        this.props.addBus(details, res => {
            if (res.status) {
                this.props.handleSnackBar({
                    type: "SHOW_SNACKBAR",
                    msg: 'Route Added Successfully!'
                })
                this.setState({
                    open: false,
                    purpose: "Create",
                    busNumber: null,

                })
            } else {
                this.alertDialog.current.handleClickOpen("Error Occurred!", `Something Went Wrong.Please Create Bus Again`)
            }
        })

    }





    render() {
        return(
            <React.Fragment>
                {<AlertDialog ref={this.alertDialog}/>}
                <Dialog
                    open={this.state.open}
                    aria-labelledby="form-dialog-title"
                    // TransitionComponent={Transition}
                    maxWidth={"md"}
                    fullWidth={true}

                >
                    <DialogTitle id="form-dialog-title"> Route</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12} md={6}>
                                <TextField
                                    margin="dense"
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
                            <Grid item xs={12} sm={12} md={6}>
                                <TextField
                                    type={"number"}
                                    margin="dense"
                                    id="distance"
                                    name="distance"
                                    label="Distance (Km)"
                                    fullWidth
                                   /* value={this.state.distance}
                                    onChange={(e) => {
                                        this.handleInput(e)
                                    }}*/
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12} md={6}>
                                <TextField
                                    margin="dense"
                                    id="start"
                                    name="start"
                                    label="Start Station"
                                    fullWidth
                                   /* value={this.state.start}
                                    onChange={(e) => {
                                        this.handleInput(e)
                                    }}*/
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <TextField
                                    margin="dense"
                                    id="end"
                                    name="end"
                                    label="End Station"
                                    fullWidth
                                   /* value={this.state.end}
                                    onChange={(e) => {
                                        this.handleInput(e)
                                    }}*/
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>

                            <Grid item xs={12} sm={12} md={6}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <TextField
                                            type={"number"}
                                            margin="dense"
                                            id="hours"
                                            name="hours"
                                            label="Duration (Hours)"
                                            fullWidth
                                            /*value={this.state.hours}
                                            onChange={(e) => {
                                                this.handleInput(e)
                                            }}*/
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={6}>
                                        <TextField
                                            type={"number"}
                                            margin="dense"
                                            id="minutes"
                                            name="minutes"
                                            label="Duration (Minutes)"
                                            fullWidth
                                            /*value={this.state.minutes}
                                            onChange={(e) => {
                                                this.handleInput(e)
                                            }}*/
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <TextField
                                    type={"number"}
                                    margin="dense"
                                    id="fare"
                                    name="fare"
                                    label="Fare (Rs)"
                                    fullWidth
                                  /*  value={this.state.fare}
                                    onChange={(e) => {
                                        this.handleInput(e)
                                    }}*/
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <ChipInput
                                label={"Stations"}
                                fullWidth
                                allowDuplicates={false}
                               /* value={this.state.stations}
                                onAdd={(chip) => this.addChips(chip)}
                                onDelete={(chip, index) => this.handleDeleteChip(chip, index)}*/
                            />

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

const mapStateToProps = (state) => {
    return {
        email: state.firebase.auth.email
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleSnackBar: (status) => dispatch(status),
        addBus: (details, callback) => dispatch(addBus(details, callback)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(BusesDialog)

