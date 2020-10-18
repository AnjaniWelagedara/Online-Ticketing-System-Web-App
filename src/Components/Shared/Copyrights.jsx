import React from "react";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

export default function Copyrights (){
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
                OnlineTicketing.lk
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
