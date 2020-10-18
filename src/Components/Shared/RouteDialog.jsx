import React, {Component, createRef, forwardRef} from 'react';
import {connect} from "react-redux";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MaterialTable from "material-table";
import Grid from '@material-ui/core/Grid';
import Slide from "@material-ui/core/Slide";
import {blue, red, green} from "@material-ui/core/colors";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {addRoute, editRoute} from "../../Store/Actions/RouteActions";
import AlertDialog from "./AlertDialog";
import routeValidations from "../../Functions/Validations/RouteValidation/routeValidations"


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

class RouteDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            purpose: "Create",
            routeNumber: "",
            distance: "",
            start: "",
            end: "",
            hours: "",
            minutes: "",
            time: "",
            fare: "",
            data: []
        }
    }

    alertDialog = createRef();

    handleClickOpenForCreate = () => {
        this.setState({
            purpose: "Create",
            open: true,
        })
    };

    handleClickOpenForEdit = (route) => {

        let StationArray = [];

        route.stations.map(station => {
            StationArray.push({
                start : station.start,
                end : station.end,
                distance : station.distance,
            })
        })

        this.setState({
            open: true,
            purpose: "Edit",
            id : route.id,
            routeNumber: route.routeNumber,
            distance: route.distance,
            start: route.start,
            end: route.end,
            hours: route.hours,
            minutes: route.minutes,
            time: route.time,
            fare: route.fare,
            data: StationArray,
        })
    };

    handleClose = () => {
        this.setState({
            open: false,
            purpose: "Create",
            routeNumber: "",
            distance: "",
            start: "",
            end: "",
            hours: "",
            minutes: "",
            time: "",
            fare: "",
            data: []
        })
    };

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handlePublish = (e) => {
        this.setState({
            [e.target.name]: e.target.checked
        })
    };

    submit = () => {

        let details = {
            routeNumber: this.state.routeNumber,
            start: this.state.start,
            end: this.state.end,
            distance: this.state.distance,
            hours: this.state.hours,
            minutes: this.state.minutes,
            fare: this.state.fare,
            stations: this.state.data,
        }

        const result = routeValidations(details);

        if (result.status) {
            if (this.state.purpose === "Create") {
                this.props.addRoute(details, res => {
                    if (res.status) {
                        this.props.handleSnackBar({
                            type: "SHOW_SNACKBAR",
                            msg: 'Route Added Successfully!'
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
        } else {
            this.alertDialog.current.handleClickOpen("Form Validation Error!", result.error);
        }
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
                    <DialogTitle id="form-dialog-title">{this.state.purpose} Route</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12} md={6}>
                                <TextField
                                    margin="dense"
                                    id="routeNumber"
                                    name="routeNumber"
                                    label="Route Number"
                                    fullWidth
                                    value={this.state.routeNumber}
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
                                    value={this.state.distance}
                                    onChange={(e) => {
                                        this.handleInput(e)
                                    }}
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
                                    value={this.state.start}
                                    onChange={(e) => {
                                        this.handleInput(e)
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <TextField
                                    margin="dense"
                                    id="end"
                                    name="end"
                                    label="End Station"
                                    fullWidth
                                    value={this.state.end}
                                    onChange={(e) => {
                                        this.handleInput(e)
                                    }}
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
                                            value={this.state.hours}
                                            onChange={(e) => {
                                                this.handleInput(e)
                                            }}
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
                                            value={this.state.minutes}
                                            onChange={(e) => {
                                                this.handleInput(e)
                                            }}
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
                                    label="Fare for one Km (Rs)"
                                    fullWidth
                                    value={this.state.fare}
                                    onChange={(e) => {
                                        this.handleInput(e)
                                    }}
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <MaterialTable
                                title="All Stations"
                                columns={[
                                    {title: "Start Station", field: "start"},
                                    {title: "End Station", field: "end"},
                                    {title: "Distance Between Stations", field: "distance", type : "numeric"},
                                ]}
                                data={this.state.data}

                                icons={
                                    {
                                        Edit: forwardRef((props, ref) => <EditIcon  style={{color: green[500]}} {...props} ref={ref}/>),
                                        Delete: forwardRef((props, ref) => <DeleteIcon  style={{color: red[500]}} {...props} ref={ref}/>),
                                        Add: forwardRef((props, ref) => <AddCircleIcon  style={{color: blue[500]}} {...props} ref={ref}/>)

                                    }
                                }

                                localization={{
                                    body: {
                                        editRow: {
                                            saveTooltip: "Save",
                                            cancelTooltip: "No",
                                            deleteText: "Do you want to delete this Station Record."
                                        },
                                        addTooltip: "Add Station Record",
                                        deleteTooltip: "Delete Station Record",
                                        editTooltip: "Edit Station Record",
                                        emptyDataSourceMessage: 'Station Record List Empty',
                                    },
                                    header: {
                                        actions: 'Actions'
                                    },
                                }}

                                options={{
                                    actionsColumnIndex: -1,
                                }}

                                editable={{
                                    onRowAdd: (newData) =>
                                        new Promise((resolve) => {
                                            setTimeout(() => {
                                                resolve();
                                                this.setState((prevState) => {
                                                    const data = [...prevState.data];
                                                    data.push(newData);
                                                    return { ...prevState, data };
                                                });
                                            }, 600);
                                        }),
                                    onRowUpdate: (newData, oldData) =>
                                        new Promise((resolve) => {
                                            setTimeout(() => {
                                                resolve();
                                                if (oldData) {
                                                    this.setState((prevState) => {
                                                        const data = [...prevState.data];
                                                        data[data.indexOf(oldData)] = newData;
                                                        return { ...prevState, data };
                                                    });
                                                }
                                            }, 600);
                                        }),
                                    onRowDelete: (oldData) =>
                                        new Promise((resolve) => {
                                            setTimeout(() => {
                                                resolve();
                                                this.setState((prevState) => {
                                                    const data = [...prevState.data];
                                                    data.splice(data.indexOf(oldData), 1);
                                                    return { ...prevState, data };
                                                });
                                            }, 600);
                                        }),
                                }}
                            />
                        </Grid>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleClose()}>
                            Cancel
                        </Button>
                        <Button onClick={() => this.submit()}>
                            {this.state.purpose} Route
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
        addRoute: (details, callback) => dispatch(addRoute(details, callback)),
        editRoute: (id, details, callback) => dispatch(editRoute(id, details, callback)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(RouteDialog)