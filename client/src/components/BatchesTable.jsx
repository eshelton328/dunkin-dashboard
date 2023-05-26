import React, { useState, useMemo } from 'react';
import BatchesHead from './BatchesHead.jsx';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import DownloadIcon from '@mui/icons-material/Download';
import FileDownloadOffIcon from '@mui/icons-material/FileDownloadOff';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Button } from '@mui/material'
import { getBatchesTableData, downloadSourceReport, downloadBranchReport, downloadStatusReport } from '../lib/util.js';
import { refreshReportsByBatch } from '../lib/routes.js';

const BatchesTable = ({ batches }) => {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('employee');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const rows = getBatchesTableData(batches)

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const getSourceReport = (batchId) => {
        const fileName = `${batchId}.csv`
        downloadSourceReport(fileName)
    }

    const getBranchReport = (batchId) => {
        const fileName = `${batchId}.csv`
        downloadBranchReport(fileName)
    }

    const getStatusReport = (batchId) => {
        const fileName = `${batchId}.csv`
        downloadStatusReport(fileName)
    }

    const refreshReports = async (batchId) => {
        let res = await refreshReportsByBatch(batchId)
        console.log(res)
    }

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
                <TableContainer sx={{ maxHeight: 350 }}>
                    <Table
                        sx={{ minWidth: 750 }}
                        stickyHeader
                        aria-labelledby='tableTitle'
                        size='medium'
                    >
                        <BatchesHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {visibileRows.map((row, index) => {
                                return (
                                    <TableRow
                                        key={index}
                                    >
                                        <TableCell>{row.createdAt}</TableCell>
                                        <TableCell>{row.fileName}</TableCell>
                                        <TableCell>{row.batchId}</TableCell>
                                        <TableCell>{row.status}</TableCell>
                                        <TableCell>
                                            {
                                                row.sourceReport !== null ?
                                                    <Button startIcon={<DownloadIcon />} onClick={() => getSourceReport(row.batchId)}/>
                                                : <Button startIcon={<FileDownloadOffIcon/>} />
                                            }
                                        </TableCell>
                                        <TableCell>
                                            {
                                                row.branchReport !== null ?
                                                    <Button startIcon={<DownloadIcon /> } onClick={() => getBranchReport(row.batchId)}/>
                                                : <Button startIcon={<FileDownloadOffIcon />} />
                                            }
                                        </TableCell>
                                        <TableCell>
                                            {
                                                row.statusReport !== null ?
                                                    <Button startIcon={<DownloadIcon />} onClick={() => getStatusReport(row.batchId)}/>
                                                : <Button startIcon={<FileDownloadOffIcon/>} />
                                            }
                                        </TableCell>
                                        <TableCell>
                                            <Button startIcon={<RefreshIcon />} onClick={() => refreshReports(row.batchId)}/>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50, 100, 1000]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    )
}

export default BatchesTable;