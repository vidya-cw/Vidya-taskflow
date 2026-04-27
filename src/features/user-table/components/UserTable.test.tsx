import { render, screen, waitFor, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchUsers } from '../services/apiService';
import { usersFixture } from './fixtures/users.fixture';
import UserTable from './UserTable';

vi.mock('../services/apiService', () => ({
	fetchUsers: vi.fn(() => Promise.resolve(usersFixture)),
}));

const mockedFetchUsers = vi.mocked(fetchUsers);

const renderUserTable = () => render(<UserTable />);

const getMainGrid = async () => {
	const grids = await screen.findAllByRole('grid');
	if (grids.length === 0) {
		throw new Error('No grids found');
	}
	return grids[0];
};

describe('UserTable', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('shows loading state initially', () => {
		renderUserTable();

		expect(screen.getByText(/loading ag grid data/i)).toBeInTheDocument();
	});

	it('renders AG Grid after data loads', async () => {
		renderUserTable();

		const grid = await getMainGrid();
		expect(grid).toBeInTheDocument();
	});

	it('displays error message when fetch fails', async () => {
		mockedFetchUsers.mockRejectedValueOnce(new Error('API Error'));
		renderUserTable();

		expect(await screen.findByText(/error loading data/i)).toBeInTheDocument();
	});

	it('loads data into the grid', async () => {
		renderUserTable();
		const grid = await getMainGrid();

		await waitFor(() => {
			const rows = grid.querySelectorAll('.ag-row');
			expect(rows.length).toBe(usersFixture.length);
		});
	});

	it('renders correct number of columns', async () => {
		renderUserTable();
		const grid = await getMainGrid();

		const columnHeaders = within(grid).getAllByRole('columnheader');
		expect(columnHeaders.length).toBe(9);
	});

	it('enables column filters', async () => {
		renderUserTable();
		const grid = await getMainGrid();

		const floatingFilters = grid.querySelectorAll('.ag-floating-filter');

		expect(floatingFilters.length).toBeGreaterThan(0);
	});
});
