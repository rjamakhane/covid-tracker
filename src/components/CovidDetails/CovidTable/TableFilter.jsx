import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const TableFilter = ({ searchFields, onFilter }) => {
  const [searchField, setSearchField] = useState('Country');
  const [searchValue, setSearchValue] = useState('');
  const [debounceTimer, setDebounceTimer] = useState('');

  const debounceSearch = (func, delay) => {
    return function (e) {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      setDebounceTimer(setTimeout(() => {
        func.call(context, args);
      }, delay));
    }
  }

  return (
    <Box
      component="form"
      style={{padding: '20px 5px', flex: '1'}}
      sx={{
        '& > :not(style)': { m: 1, width: '250px' },
      }}
      noValidate
    >
      <FormControl fullWidth>
        <InputLabel id="select-field">Select Field</InputLabel>
        <Select
          labelId="select-search-field"
          id="select-search-field"
          value={searchField}
          label="Select Field"
          data-testid="search-field-category"
          onChange={(e) => {
            setSearchField(e.target.value);
            setSearchValue(''); //clear search field value
            onFilter(searchField, ""); //clear applied filter
          }}
        >
          {searchFields.map((el, index) => {
            return <MenuItem value={el.id} key={index}>{el.label}</MenuItem>
          })}
        </Select>
      </FormControl>
      <TextField data-testid="search" label="Search" variant="standard"
        value={searchValue}
        type={searchField === 'Country' ? 'text' : 'number'}
        onChange={(e) => {
          const value = e.target.value;
          setSearchValue(value);
          debounceSearch(() => onFilter(searchField, value), 500)(e);
        }}
      />
    </Box>
  );
}

TableFilter.propTypes = {
  searchFields: PropTypes.array.isRequired,
  onFilter: PropTypes.func.isRequired
}

export default TableFilter;
