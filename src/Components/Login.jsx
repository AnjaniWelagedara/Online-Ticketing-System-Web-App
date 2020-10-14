import React, {Component} from "react";
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Box,
    Link,
    makeStyles,
    Typography,
    Container,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import {Redirect} from "react-router-dom";
import Copyrights from "./Shared/Copyrights";
import {connect} from "react-redux";
import {employeeSignIn} from "../Store/Actions/EmployeeSignInActions";
import {compose} from "redux";
import {withStyles} from "@material-ui/core/styles";

const styles = (theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(2),
        backgroundColor: theme.palette.primary.main,
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            empEmail: "",
            empPassword: ""
        }
    }


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.employeeSignIn(this.state)
    };

    render() {
        const {auth, classes} = this.props;
        if (auth.uid)
            return <Redirect to= "/dashboard"/>

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <AccountCircleIcon style={{fontSize: 40}}/>
                    </Avatar>
                    <Typography component="h2" variant="h5">
                        Transport Manager Login Portal
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="empEmail"
                            name="empEmail"
                            label="Email Address"
                            autoComplete="off"
                            autoFocus
                            value={this.state.empEmail}
                            onChange={this.handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="empPassword"
                            label="Password"
                            type="password"
                            id="empPassword"
                            autoComplete="current-password"
                            value={this.state.empPassword}
                            onChange={this.handleChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.handleSubmit}
                        >
                            Sign In
                        </Button>
                    </form>
                    <Box mt={2}>
                        <Copyrights/>
                    </Box>
                </div>
            </Container>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        employeeSignIn: (credential) => dispatch(employeeSignIn(credential)),
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(Login)
