import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {Container} from "@material-ui/core";
import TripsSmallView from "./Trips/TripsSmallView";
import Grid from "@material-ui/core/Grid";
import getTripsByDay from "./Trips/getTripsByDay";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: 2500,
        color: '#fff',
    },
}));


function TimeTableDaysView(props) {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const classes = useStyles();
    const route = props.route;
    const buses = props.buses;


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const handleEdit = () => {
        setValue(0);
        setValue(1);
    };


    return (
        <Container
            maxWidth="lg"
            style={{marginTop: "40px", marginBottom: "50px"}}
        >
            <React.Fragment>
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab label="Monday" {...a11yProps(0)} />
                        <Tab label="Tuesday" {...a11yProps(1)} />
                        <Tab label="Wednesday" {...a11yProps(2)} />
                        <Tab label="Thursday" {...a11yProps(3)} />
                        <Tab label="Friday" {...a11yProps(4)} />
                        <Tab label="Saturday" {...a11yProps(5)} />
                        <Tab label="Sunday" {...a11yProps(6)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        <Grid container direction={"row"}>
                            {getTripsByDay("Monday", route).map(trip => {
                                return <TripsSmallView trip={trip} route={route} buses={buses}/>
                            })}
                        </Grid>

                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        <Grid container direction={"row"}>
                            {getTripsByDay("Tuesday", route).map(trip => {
                                return <TripsSmallView trip={trip} route={route} buses={buses}/>
                            })}
                        </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={2} dir={theme.direction}>
                        <Grid container direction={"row"}>
                            {getTripsByDay("Wednesday", route).map(trip => {
                                return <TripsSmallView trip={trip} route={route} buses={buses}/>
                            })}
                        </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={3} dir={theme.direction}>
                        <Grid container direction={"row"}>
                            {getTripsByDay("Thursday", route).map(trip => {
                                return <TripsSmallView trip={trip} route={route} buses={buses}/>
                            })}
                        </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={4} dir={theme.direction}>
                        <Grid container direction={"row"}>
                            {getTripsByDay("Friday", route).map(trip => {
                                return <TripsSmallView trip={trip} route={route} buses={buses}/>
                            })}
                        </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={5} dir={theme.direction}>
                        <Grid container direction={"row"}>
                            {getTripsByDay("Saturday", route).map(trip => {
                                return <TripsSmallView trip={trip} route={route} buses={buses}/>
                            })}
                        </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={6} dir={theme.direction}>
                        <Grid container direction={"row"}>
                            {getTripsByDay("Sunday", route).map(trip => {
                                return <TripsSmallView trip={trip} route={route} buses={buses}/>
                            })}
                        </Grid>
                    </TabPanel>
                </SwipeableViews>
            </React.Fragment>
        </Container>
    );
}

export default (TimeTableDaysView)

