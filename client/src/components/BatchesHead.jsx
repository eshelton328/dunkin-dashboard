import React from 'react';
import Box from '@mui/material/Box';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';

const BatchesHead = (props) => {
    const { order, orderBy, onRequestSort } = props;
    const headCells = [
        {
            id: 'createdAt',
            numeric: false,
            disablePadding: true,
            label: 'Created At',
        },
        {
            id: 'fileName',
            numeric: false,
            disablePadding: true,
            label: 'Filename',
        },
        {
            id: 'batchId',
            numeric: false,
            disablePadding: true,
            label: 'Batch Id',
        },
        {
            id: 'status',
            numeric: false,
            disablePadding: true,
            label: 'Status',
        },
        {
            id: 'sourceReport',
            numeric: false,
            disablePadding: true,
            label: 'Source Report',
        },
        {
            id: 'branchReport',
            numeric: false,
            disablePadding: true,
            label: 'Branch Report',
        },
        {
            id: 'statusReport',
            numeric: false,
            disablePadding: true,
            label: 'Status Report',
        },
        {
            id: '',
            numeric: false,
            disablePadding: true,
            label: '',
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

export default BatchesHead;