import { screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import {
	checkColumnCount,
	checkFiltersEnabled,
	checkGridLoaded,
	renderComponent,
} from '../../../utils/testUtils';
import AgGridDemo from './AgGridDemo';

vi.mock('../services/apiService', () => ({
	fetchUsers: vi.fn(() =>
		Promise.resolve([
			{
				gender: 'male',
				name: { first: 'John', last: 'Doe' },
				email: 'john@example.com',
				phone: '123-456-7890',
				dob: { date: '1990-01-01', age: 34 },
				location: { city: 'New York' },
				picture: { thumbnail: 'https://example.com/pic.jpg' },
			},
			{
				gender: 'female',
				name: { first: 'Jane', last: 'Smith' },
				email: 'jane@example.com',
				phone: '098-765-4321',
				dob: { date: '1985-05-15', age: 39 },
				location: { city: 'Los Angeles' },
				picture: { thumbnail: 'https://example.com/pic2.jpg' },
			},
		])
	),
}));

describe('AgGridDemo', () => {
	it('renders AG Grid', async () => {
		renderComponent(<AgGridDemo />);

		const grids = await screen.findAllByRole('grid');
		expect(grids.length).toBeGreaterThan(0);
	});

	it('loads data into the grid', async () => {
		renderComponent(<AgGridDemo />);

		const grid = (await screen.findAllByRole('grid'))[0];

		await waitFor(() => {
			expect(checkGridLoaded(grid)).toBe(true);
		});
	});

	it('shows loading state initially', () => {
		renderComponent(<AgGridDemo />);

		expect(screen.getByText(/loading ag grid data/i)).toBeInTheDocument();
	});

	it('renders correct number of columns', async () => {
		renderComponent(<AgGridDemo />);

		const grid = (await screen.findAllByRole('grid'))[0];

		expect(checkColumnCount(grid, 9)).toBe(true);
	});

	it('enables column filters', async () => {
		renderComponent(<AgGridDemo />);

		const grid = (await screen.findAllByRole('grid'))[0];

		expect(checkFiltersEnabled(grid)).toBe(true);
	});
});
