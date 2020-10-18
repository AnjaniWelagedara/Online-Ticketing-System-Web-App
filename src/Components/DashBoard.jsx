import React, {Component} from "react";

import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import DashboardItem from "./DashboardItem";
import Grid from "@material-ui/core/Grid";
import ReportsContainer from "./Reports/ReportsContainer";
import Typography from '@material-ui/core/Typography';


export default class DashBoard extends Component {
    render() {
        return (
            <React.Fragment>
                <CssBaseline/>
                <Container>
                    <Grid container style={{marginTop: "50px"}}>
                        <Grid xs={12} item>
                            <Typography align={"center"} variant={"h4"} gutterBottom>
                                Dashboard
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={3} style={{padding: "10px"}}>
                            <DashboardItem type={"buses"}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={3} style={{padding: "10px"}}>
                            <DashboardItem type={"routes"}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={3} style={{padding: "10px"}}>
                            <DashboardItem type={"timetables"}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={3} style={{padding: "10px"}}>
                            <DashboardItem type={"free"}/>
                        </Grid>
                        <Grid item xs={12}>
                            <ReportsContainer/>
                        </Grid>
                    </Grid>
                </Container>
            </React.Fragment>
        );
    }
}
