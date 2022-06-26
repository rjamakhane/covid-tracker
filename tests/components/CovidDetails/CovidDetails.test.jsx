import { render, screen, waitFor } from '@testing-library/react';
import CovidDetails from '../../../src/components/CovidDetails';
import * as Service from '../../../src/services/DataApi';
import ErrorBoundary from '../../../src/components/ErrorBoundary'

describe('Covid Details', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should render the container on promise resolve', async () => {
        const spy = jest.spyOn(Service, 'getCovidData').mockResolvedValue({
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
        });
        render(<CovidDetails />);
        const loader = screen.getByTestId('Loader');
        expect(spy).toHaveBeenCalled()
        expect(loader.childElementCount).toBe(1);
        await waitFor(() => {
            const container = screen.getByTestId('covid-container');
            expect(container.childElementCount).toBe(2);
        })
    });

    test('should render on promise reject and display error boundary message', async () => {
        const spy = jest.spyOn(Service, 'getCovidData').mockResolvedValue([]);
        render(
            <ErrorBoundary>
                <CovidDetails />
            </ErrorBoundary>
        );
        const loader = screen.getByTestId('Loader');
        expect(spy).toHaveBeenCalled()
        expect(loader.childElementCount).toBe(1);
        await waitFor(() => {
            const errorBoundaryMessage = screen.getByTestId('errorMessage');
            expect(errorBoundaryMessage).toHaveTextContent("There is an issue. Please try again after some time!");
        })
    });
});

