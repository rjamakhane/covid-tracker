import { render, screen } from '@testing-library/react';
import Summary from '../../../src/components/CovidDetails/Summary';
import { CONSTANTS } from '../../../src/constants'

describe('Summary', () => {
  const props = {
    globalInfo: {
      Date: "2022-06-24T01:20:12.812Z",
      NewConfirmed: 691848,
      NewDeaths: 1817,
      NewRecovered: 0,
      TotalConfirmed: 540156478,
      TotalDeaths: 6319234,
      TotalRecovered: 0
    }
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render the confirmed section', () => {
    render(<Summary {...props} />);
    const confirmedSection = screen.getByTestId('confirmed-section');
    expect(confirmedSection).toHaveTextContent(CONSTANTS.TOTAL_CONFIRMED);
    expect(confirmedSection).toHaveTextContent(props.globalInfo.TotalConfirmed.toLocaleString());
    expect(confirmedSection).toHaveTextContent(props.globalInfo.NewConfirmed.toLocaleString());
  });

  test('should render the deaths section', () => {
    render(<Summary {...props} />);
    const deathSection = screen.getByTestId('deaths-section');
    expect(deathSection).toHaveTextContent(CONSTANTS.TOTAL_DEATHS);
    expect(deathSection).toHaveTextContent(props.globalInfo.TotalDeaths.toLocaleString());
    expect(deathSection).toHaveTextContent(props.globalInfo.NewDeaths.toLocaleString());
  });

  test('should render the recovered section', () => {
    render(<Summary {...props} />);
    const recoveredSection = screen.getByTestId('recovered-section');
    expect(recoveredSection).toHaveTextContent(CONSTANTS.TOTAL_RECOVERED);
    expect(recoveredSection).toHaveTextContent(props.globalInfo.TotalRecovered.toLocaleString());
    expect(recoveredSection).toHaveTextContent(props.globalInfo.NewRecovered.toLocaleString());
  });

  test('should render the last updated date', () => {
    render(<Summary {...props} />);
    const lastUpdated = screen.getByTestId('last-updated');
    expect(lastUpdated).toHaveTextContent(`${CONSTANTS.LAST_UPDATED_ON} Jun 24, 2022, 6:50 AM`);
  });

  test('should render the - if last update date is empty', () => {
    const localProps = {
      ...props
    };
    localProps.globalInfo.Date = "";
    render(<Summary {...props} />);
    const lastUpdated = screen.getByTestId('last-updated');
    expect(lastUpdated).toHaveTextContent(`${CONSTANTS.LAST_UPDATED_ON} -`);
  });
});

