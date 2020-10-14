import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default class ConfirmDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            title: "",
            description: "",
            type: "",
        }
    }

    handleClickOpen = (title, description, type) => {
        this.setState({
            title: title,
            description: description,
            type: type,
            open: true
        })
    };

    handleClose = () => {
        this.setState({
            open: false
        })
    };

    confirmDelete = () => {
        this.setState({
            open: false
        })

        if(this.state.type === "deleteRoute"){
            this.props.deleteRoute()
        }else if(this.state.type === "view"){
            this.props.editMaterialViewStatus()
        }else if(this.state.type === "Announcement_Delete"){
            this.props.parentFunction('Announcement')
        }else {
            this.props.parentFunction()
        }
    };

    render() {
        return (
            <div>
                <Dialog
                    open={this.state.open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => this.handleClose()}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                    style={{
                        zIndex: 2000,
                    }}
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        {this.state.title}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            {this.state.description}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleClose()}>
                            No, I'm Sorry
                        </Button>
                        <Button onClick={() => this.confirmDelete()}>
                            Yes, I'm Sure
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
