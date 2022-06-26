import { render, screen } from '@testing-library/react';
import Header from '../../../src/components/Layout/Header';

describe('Header', () => {
  test('should render the logo', () => {
    render(<Header />);
    const logo = screen.getByTestId('Coronavirus');
    expect(logo).toBeTruthy();
  });
});

