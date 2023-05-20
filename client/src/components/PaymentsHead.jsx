import React from 'react';
import Box from '@mui/material/Box';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';

const PaymentsHead = (props) => {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const headCells = [
        {
            id: 'employee',
            numeric: false,
            disablePadding: true,
            label: 'Employee',
        },
        {
            id: 'employeePhone',
            numeric: false,
            disablePadding: true,
            label: 'Employee Phone',
        },
        {
            id: 'payor',
            numeric: false,
            disablePadding: true,
            label: 'Payor',
        },
        {
            id: 'payorAcc',
            numeric: true,
            disablePadding: true,
            label: 'Payor Account',
        },
        {
            id: 'payorRout',
            numeric: true,
            disablePadding: true,
            label: 'Payor Routing',
        },
        {
            id: 'payeeAcc',
            numeric: true,
            disablePadding: true,
            label: 'Payee Account',
        },
        {
            id: 'amount',
            numeric: false,
            disablePadding: true,
            label: 'Amount',
        }

    ];

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align='left'
                        padding='normal'
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component='span' sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default PaymentsHead;