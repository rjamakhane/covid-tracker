import React from 'react';
import { Coronavirus } from '@mui/icons-material';
import { CONSTANTS } from '../../constants';

const Header = () => {
    return (
        <header data-testid="header">
            <Coronavirus fontSize="large" className="logo" data-testid="Coronavirus" />
            <h2>{CONSTANTS.HEADER_TITLE}</h2>
        </header>
    )
};

export default Header;