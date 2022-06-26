import React, { useEffect, useState } from 'react';
import { getCovidData } from '../../services/DataApi';
import Summary from './Summary';
import CovidTable from './CovidTable';
import Loader from '../Loader/Loader'
import './style.scss';

const CovidDetails = () => {
    const [covidData, setCovidData] = useState(null);
    const [loading,  setLoading] = useState(false);

    const fetchCovidData = async () => {
        setLoading(true)
        try{
            const response = await getCovidData()
            setCovidData(response);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCovidData()
    }, []);

    if(!covidData || loading) return <Loader />;

    return (
        <div id="covid-summary-container" data-testid="covid-container">
            <div className="global-summary">
                <Summary globalInfo = {covidData?.Global} />
            </div>
            <div className="table-data">
                <CovidTable covidData={covidData} fetchCovidData={fetchCovidData} />
            </div>
        </div>
    )
}

export default CovidDetails;