import { render, screen, fireEvent, within, waitFor } from '@testing-library/react';
import CovidTable from '../../../../src/components/CovidDetails/CovidTable';
import { CONSTANTS } from '../../../../src/constants'

describe('Covid Table', () => {
  const mockResponse = {
    Countries: [
      {
        Country: "Afghanistan",
        CountryCode: "AF",
        Date: "2022-06-25T02:56:43.56Z",
        ID: "1882726e-0c18-4075-b13c-bf9b6d6e8c76",
        NewConfirmed: 46,
        NewDeaths: 2,
        NewRecovered: 0,
        Premium: {},
        Slug: "afghanistan",
        TotalConfirmed: 182033,
        TotalDeaths: 7717,
        TotalRecovered: 0,
      },
      {
        Country: "Albania",
        CountryCode: "AL",
        Date: "2022-06-25T02:56:43.56Z",
        ID: "1c66f4d8-fcf4-4fec-ba70-462547ad2a74",
        NewConfirmed: 173,
        NewDeaths: 0,
        NewRecovered: 0,
        Premium: {},
        Slug: "albania",
        TotalConfirmed: 278504,
        TotalDeaths: 3497,
        TotalRecovered: 0,
      },
      {
        Country: "India",
        CountryCode: "IN",
        Date: "2022-06-25T02:56:43.56Z",
        ID: "e2359155-e37c-4475-842e-8917a5562b67",
        NewConfirmed: 17336,
        NewDeaths: 13,
        NewRecovered: 0,
        Premium: {},
        Slug: "india",
        TotalConfirmed: 43362294,
        TotalDeaths: 524954,
        TotalRecovered: 0,
      },
      {
        Country: "Indonesia",
        CountryCode: "ID",
        Date: "2022-06-25T02:56:43.56Z",
        ID: "e2359155-e37c-4475-842e-8917a5562b67",
        NewConfirmed: 0,
        NewDeaths: 13,
        NewRecovered: 0,
        Premium: {},
        Slug: "Indonesia",
        TotalConfirmed: 43362294,
        TotalDeaths: 524954,
        TotalRecovered: 0,
      }
    ]
  };
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  const renderComponent = (covidData = mockResponse) => {
    const fetchCovidData = jest.fn();
    render(<CovidTable covidData={covidData} fetchCovidData={fetchCovidData} />);
  }

  test('should render column headers', () => {
    renderComponent();
    const headRow = screen.getByTestId('head-row');
    expect(headRow.childElementCount).toBe(7);
    const expectedColumnTitles = ["Country", "New Confirmed", "Total Confirmed", "New Deaths", "Total Deaths", "New Recovered", "Total Recovered"]
    headRow.childNodes.forEach((node, index) => {
      expect(node.textContent).toBe(expectedColumnTitles[index]);
    });
  });

  test("should render the table body with 2 rows", () => {
    renderComponent();
    const tableBody = screen.getByTestId('covid-table-body');
    expect(tableBody.childElementCount).toBe(4);
  });

  test("should render no data found row if data is empty", () => {
    renderComponent({ Countries: [] });
    const tableBody = screen.getByTestId('covid-table-body');
    expect(tableBody.childElementCount).toBe(1);
    expect(tableBody.childNodes[0].textContent).toBe(CONSTANTS.NO_DATA_FOUND);
  });

  test.each([
    ["India", 1],
    ["Ind", 2]
  ])('filter by Country and search for "%s" should return %j', async (searchValue, expectedRowCount) => {
    renderComponent();
    const searchBox = screen.getByTestId('search');
    const searchInput = within(searchBox).getByLabelText("Search")
    fireEvent.change(searchInput, { target: { value: searchValue } });
    jest.runAllTimers();
    await waitFor(() => {
      const tableBody = screen.getByTestId('covid-table-body');
      expect(tableBody.childElementCount).toBe(expectedRowCount);
    });
  });

  test.each([
    [46, 1],
    [173, 2],
    [9, 1],
    [123123123, 1]
  ])('filter by New Confirmed and search for "%i" should return %i', async (searchValue, expectedRowCount) => {
    renderComponent();
    const selectCategory = screen.getByTestId('search-field-category');
    const selectBox = selectCategory.childNodes[1];
    fireEvent.change(selectBox, { target: { value: "NewConfirmed" } });

    const searchBox = screen.getByTestId('search');
    const searchInput = within(searchBox).getByLabelText("Search")
    fireEvent.change(searchInput, { target: { value: searchValue } });
    jest.runAllTimers();
    await waitFor(() => {
      const tableBody = screen.getByTestId('covid-table-body');
      expect(tableBody.childElementCount).toBe(expectedRowCount);
    });
  });

  test.each([
    {
      sortField: "Country",
      sortOrder: "asc", 
      expectedFirstRowItem: "Afghanistan",
      fieldTestId: "country"
    },
    {
      sortField: "NewConfirmed",
      sortOrder: "asc", 
      expectedFirstRowItem: "+0",
      fieldTestId: "new-confirmed"
    },
    {
      sortField: "NewConfirmed",
      sortOrder: "desc", 
      expectedFirstRowItem: "+17,336",
      fieldTestId: "new-confirmed"
    }
  ])('should sort the "$sortField" in "$sortOrder" order and the first item after sort should be "$expectedFirstRowItem"', async ({sortField, sortOrder, expectedFirstRowItem, fieldTestId}) => {
    renderComponent();
    const sortElement = screen.getByTestId(sortField);
    fireEvent.click(sortElement);
    if(sortOrder === "asc" && sortField === "Country" || sortOrder === "desc"){
      fireEvent.click(sortElement);
    }

    await waitFor(() => {
      const tableBody = screen.getByTestId('covid-table-body');
      expect(within(tableBody.childNodes[0]).getByTestId(fieldTestId).textContent).toBe(expectedFirstRowItem);
    });
  });
  


});

