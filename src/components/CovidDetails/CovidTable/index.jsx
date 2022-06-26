import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import { Refresh } from '@mui/icons-material';
import Paper from '@mui/material/Paper';
import { Divider } from '@mui/material';
import { CONSTANTS } from '../../../constants'
import { descendingComparator, stableSort, formatNumbers, filterItems } from '../../../util'
import CovidTableHead from './CovidTableHead';
import TableFilter from './TableFilter';
import '../style.scss';

const items = [
    {
        id: 'Country',
        numeric: false,
        disablePadding: false,
        label: 'Country',
    },
    {
        id: 'NewConfirmed',
        numeric: true,
        disablePadding: false,
        label: 'New Confirmed',
    },
    {
        id: 'TotalConfirmed',
        numeric: true,
        disablePadding: false,
        label: 'Total Confirmed',
    },
    {
        id: 'NewDeaths',
        numeric: true,
        disablePadding: false,
        label: 'New Deaths',
    },
    {
        id: 'TotalDeaths',
        numeric: true,
        disablePadding: false,
        label: 'Total Deaths',
    },
    {
        id: 'NewRecovered',
        numeric: true,
        disablePadding: false,
        label: 'New Recovered',
    },
    {
        id: 'TotalRecovered',
        numeric: true,
        disablePadding: false,
        label: 'Total Recovered',
    }
];

const CovidTable = ({ covidData, fetchCovidData }) => {
    const rows = covidData.Countries;
    const [rowItems, setRowItems] = useState(rows);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('Country');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const getComparator = (order, orderBy) => {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterItems = (field, value) => {
        const filteredItems = value ? filterItems(rows, field, value) : rows;
        filteredItems.length ? setRowItems(filteredItems) : setRowItems([]);
    }

    const sortedItems = stableSort(rowItems, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Box sx={{ width: '100%', margin: "0px 5px" }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <div className="tools">
                    <TableFilter searchFields={items} onFilter={handleFilterItems} />
                    <div className="refresh">
                        <IconButton color="primary" aria-label="upload picture" component="span" onClick={fetchCovidData}>
                            <Refresh />
                        </IconButton>
                    </div>
                </div>
                <Divider />
                <TableContainer>
                    <Table
                        sx={{ width: '100%' }}
                        aria-labelledby="tableTitle"
                    >
                        <CovidTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            headCells={items}
                        />
                        <TableBody data-testid="covid-table-body">
                            {sortedItems.length ? sortedItems.map((row, index) => {

                                return (
                                    <TableRow
                                        hover
                                        tabIndex={-1}
                                        key={index}
                                    >
                                        <TableCell
                                            component="th"
                                            data-testid="country"
                                        >
                                            {row.Country}
                                        </TableCell>
                                        <TableCell data-testid="new-confirmed" align="right" className="new-confirmed">+{formatNumbers(row.NewConfirmed)}</TableCell>
                                        <TableCell align="right" className="confirmed">{formatNumbers(row.TotalConfirmed)}</TableCell>
                                        <TableCell align="right" className="new-deaths">+{formatNumbers(row.NewDeaths)}</TableCell>
                                        <TableCell align="right">{formatNumbers(row.TotalDeaths)}</TableCell>
                                        <TableCell align="right" className="new-recovered">+{formatNumbers(row.NewRecovered)}</TableCell>
                                        <TableCell align="right" className="recovered">{formatNumbers(row.TotalRecovered)}</TableCell>
                                    </TableRow>
                                );
                            }) : (
                                <TableRow
                                    style={{
                                        height: 53,
                                    }}
                                >
                                    <TableCell colSpan={7} align="center">{CONSTANTS.NO_DATA_FOUND}</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rowItems.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}

CovidTable.propTypes = {
    covidData: PropTypes.shape({}).isRequired,
    fetchCovidData: PropTypes.func.isRequired
}

export default CovidTable;
