import { API_DETAILS } from '../constants';
import Logger from '../services/Logger';

export const getCovidData = async () => {
    const url = API_DETAILS.URL + API_DETAILS.SUMMARY;
    Logger.log("getCovidData request made", { api: url })
    try {
        const response = await fetch(url);
        const data = await response.json();
        Logger.log("getCovidData response", data)
        return data;
    } catch (err) {
        console.log(err);
        Logger.error('failed', err)
        return []
    }
}