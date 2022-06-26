import { render, screen } from '@testing-library/react';
import { CONSTANTS } from '../src/constants'
import App from '../src/App';

describe('App', () => {
  test('renders app layout', async () => {
    render(<App />);
    const header = screen.getByTestId('header');
    const layout = screen.getByTestId('layout');
    expect(header.childElementCount).toBe(2);
    expect(layout.childElementCount).toBe(1);
    expect(header).toHaveTextContent(CONSTANTS.HEADER_TITLE);
  });
});

