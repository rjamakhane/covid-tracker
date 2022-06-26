import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import moment from 'moment';
import { CONSTANTS } from '../../constants'
import { formatNumbers } from '../../util'
import {
    shape
} from 'prop-types';
import './style.scss';

const Summary = ({ globalInfo }) => {

    const getSectionValues = (newValue, totalValue) => {
        return (
            <>
                <Typography variant="subtitle2" align="center" className="newly-added" gutterBottom>
                    {newValue ? `+${formatNumbers(newValue)}` : ``}
                </Typography>
                <Typography variant="h4" align="center" className="total" gutterBottom>
                    {formatNumbers(totalValue)}
                </Typography>
            </>
        )
    }

    const date = globalInfo.Date ? moment(globalInfo.Date).format('MMM DD, YYYY, h:mm A') : '-';

    return (
        <Card>
            <CardContent>
                <section className='last-updated' data-testid="last-updated">
                    <Typography variant="subtitle2" gutterBottom align="center">
                        {CONSTANTS.LAST_UPDATED_ON} <strong>{date}</strong>
                    </Typography>
                </section>
                <Divider />
                <section className='s-red' data-testid="confirmed-section">
                    <Typography variant="subtitle1" gutterBottom align="center" className="title">
                        {CONSTANTS.TOTAL_CONFIRMED}
                    </Typography>
                    {getSectionValues(globalInfo.NewConfirmed, globalInfo.TotalConfirmed)}
                </section>
                <Divider />
                <section data-testid="deaths-section">
                    <Typography variant="subtitle1" gutterBottom align="center" className="title">
                        {CONSTANTS.TOTAL_DEATHS}
                    </Typography>
                    {getSectionValues(globalInfo.NewDeaths, globalInfo.TotalDeaths)}
                </section>
                <Divider />
                <section className='s-green' data-testid="recovered-section">
                    <Typography variant="subtitle1" gutterBottom align="center" className="title">
                        {CONSTANTS.TOTAL_RECOVERED}
                    </Typography>
                    {getSectionValues(globalInfo.NewRecovered, globalInfo.TotalRecovered)}
                </section>
            </CardContent>
        </Card>
    );
}

Summary.propTypes = {
    globalInfo: shape({}).isRequired
}

export default Summary;
