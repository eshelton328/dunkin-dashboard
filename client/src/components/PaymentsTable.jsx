import React, { useState, useMemo } from 'react';
import PaymentsHead from './PaymentsHead.jsx';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import { getTableData } from '../lib/util.js';

const PaymentsTable = ({ payments }) => {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('employee');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const rows = getTableData(payments)

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const descendingComparator = (a, b, orderBy) => {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    const getComparator = (order, orderby) => {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    const stableSort = (array, comparator) => {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) {
                return order;
            }
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0])
    }

    const visibileRows = useMemo(
        () =>
        stableSort(rows, getComparator(order, orderBy)).slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage,
        ),
        [order, orderBy, page, rowsPerPage]
    );

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2}}>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby='tableTitle'
                        size='medium'
                    >
                        <PaymentsHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {visibileRows.map((row, index) => {
                                return (
                                    <TableRow
                                        index={index}
                                    >
                                        <TableCell>{row.employee}</TableCell>
                                        <TableCell>{row.employeePhone}</TableCell>
                                        <TableCell>{row.payor}</TableCell>
                                        <TableCell>{row.payorAcc}</TableCell>
                                        <TableCell>{row.payorRout}</TableCell>
                                        <TableCell>{row.payeeAcc}</TableCell>
                                        <TableCell>{row.amount}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5]}
                    component='div'
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                />
            </Paper>
        </Box>
    )
}

export default PaymentsTable;