import { render, screen } from '@testing-library/react';
import Layout from '../../../src/components/Layout';

describe('Sidebar', () => {
    test('should render the sidebar menu', () => {
        render(<Layout />);
        const layout = screen.getByTestId('layout');
        expect(layout.children.length).toBe(1);
    });
});

