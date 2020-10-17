import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(passengerName, passengerNIC, passengerType, passengerMobileNo, passengerAddress, registeredDate) {
    return { passengerName, passengerNIC, passengerType, passengerMobileNo, passengerAddress,registeredDate };
}


export default function BasicTable(props) {
    const classes = useStyles();

    const getRows = () => {

        let rows = []
        props.passengers.map(p => {
            rows.push(createData(p.passengerName,p.passengerNIC,p.passengerType,p.passengerMobileNo,p.passengerAddress,p.registeredDate))
        })
        return rows;
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>NIC/Passport</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Mobile</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Registered Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {getRows().map((row) => (
                        <TableRow key={row.passengerName}>
                            <TableCell component="th" scope="row">
                                {row.passengerName}
                            </TableCell>
                            <TableCell>{row.passengerNIC}</TableCell>
                            <TableCell>{row.passengerType}</TableCell>
                            <TableCell>{row.passengerMobileNo}</TableCell>
                            <TableCell>{row.passengerAddress}</TableCell>
                            <TableCell>{row.registeredDate}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
