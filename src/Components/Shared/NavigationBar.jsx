import React from 'react';
import {Link, useHistory} from "react-router-dom";
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from '@material-ui/core/Avatar';
import {  deepPurple, purple } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import AssignmentIcon from "@material-ui/icons/Assignment";
import PostAddIcon from "@material-ui/icons/PostAdd";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import firebase from "../../Config/FirebaseConfig";
import SidebarImage from "../../Images/sell-tickets-online-best-place.jpg"


const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,

    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:hover': {
                width: '20ch',
            },
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    list: {
        width: 250
    },
    fullList: {
        width: "auto"
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },

    text : {
        color : "#fff"
    },

    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },



}));

function NavigationBar(props) {
    const { auth } = props
    const classes = useStyles();
    const history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const [state, setState] = React.useState(false);

    const toggleDrawer = open => event => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState(open);
    };

    const list = () => (

        <div
            className={clsx(classes.list, {
                [classes.fullList]: "left" === "top" || "left" === "bottom"
            })}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <div style={{backgroundImage : `url(${SidebarImage})`,
                height: "150px",
                backgroundRepeat: "no-repeat",
                backgroundSize : "cover"
            }}>
                <Grid  container>
                    <Container style={{marginTop : "40px"}}>
                        <Avatar src={auth.photoURL} />
                        <Typography className={classes.text} variant="body2" noWrap>
                            {auth.displayName}
                        </Typography>
                        <Typography className={classes.text}  variant="caption" noWrap>
                            {auth.email}
                        </Typography>
                    </Container>
                </Grid>
            </div>

            <List >
                <ListItem  button component={Link} to={"/dashboard/createCourse"}>
                    <ListItemIcon>
                        <AssignmentIcon style={{color : "green"}} />
                    </ListItemIcon>
                    <ListItemText>Create Class</ListItemText>
                </ListItem>
                <ListItem button component={Link} to="/storeManager/addProducts">
                    <ListItemIcon>
                        <PostAddIcon style={{color : "orange"}} />
                    </ListItemIcon>
                    <ListItemText>All Classes</ListItemText>
                </ListItem>
                <ListItem button component={Link} to="/storeManager/allDiscounts">
                    <ListItemIcon>
                        <LocalOfferIcon style={{color : "purple"}}/>
                    </ListItemIcon>
                    <ListItemText>Revenue</ListItemText>
                </ListItem>
            </List>
            <Divider />
        </div>
    );

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}

        >
            <MenuItem className={classes.hover} onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem className={classes.hover} onClick={handleMenuClose}>My account</MenuItem>
            <MenuItem className={classes.hover} onClick={() => {}}>Sign Out</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label="show 11 new notifications" color="inherit">
                    <Badge badgeContent={11} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    const SignOut = () => {
        firebase.auth().signOut().then(() => {
            history.push("/")
        })
    }

    return (
        <div className={classes.grow} >
            <AppBar position="static"  color={"primary"} style={{color : "#fff"}}>
                <Toolbar>
                    {(auth.uid)?<IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer(true)}
                        style={{outline : "none"}}
                    >
                        <MenuIcon />
                    </IconButton>:<React.Fragment/>}
                    <Typography className={classes.title} variant="h6" noWrap>
                        OnlineTicketing.lk
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>

                    <div className={classes.sectionDesktop}>
                        <Button color="inherit" component={Link} to={'/dashboard'}>Dashboard</Button>
                        {
                            (auth.uid)
                                ? <Button autoCapitalize={false} color="inherit" onClick={() => SignOut()}>SignOut</Button>
                                : <Button color="inherit" component={Link} to={'/signIn'}>SignIn</Button>
                        }
                        <IconButton aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton aria-label="show 17 new notifications" color="inherit">
                            <Badge badgeContent={17} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <Avatar className={classes.small} alt="Remy Sharp" src={auth.photoURL} />
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}

            <Drawer anchor={"left"} open={state} onClose={toggleDrawer(false)}>
                {list("left")}
            </Drawer>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar)
