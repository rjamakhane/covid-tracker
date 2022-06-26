import { getCovidData } from '../../src/services/DataApi';

describe('Data API', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('getCovidData should resolve promise with the response', async () => {
        const mockResponse = {
            Countries: [{
                "ID": "4d2583e3-4c7a-4238-9129-f8d135d2aba2",
                "Country": "Afghanistan",
                "CountryCode": "AF",
                "Slug": "afghanistan",
                "NewConfirmed": 0,
                "TotalConfirmed": 182033,
                "NewDeaths": 0,
                "TotalDeaths": 7717,
                "NewRecovered": 0,
                "TotalRecovered": 0,
                "Date": "2022-06-25T10:38:21.603Z",
                "Premium": {}
            }],
            Global: {
                "NewConfirmed": 550606,
                "TotalConfirmed": 541558687,
                "NewDeaths": 1382,
                "TotalDeaths": 6322594,
                "NewRecovered": 0,
                "TotalRecovered": 0,
                "Date": "2022-06-25T10:38:21.603Z"
            }
        }
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockResponse),
            })
        );
        const res = await getCovidData();
        expect(res).toStrictEqual(mockResponse)
    });

    test('getCovidData should reject promise with the error', async () => {
        const mockResponse = new Error("error")
        global.fetch = jest.fn(() =>
            Promise.reject(mockResponse)
        );
        const res = await getCovidData();
        expect(res).toStrictEqual([])
    });
});

