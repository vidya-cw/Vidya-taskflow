import { AgGridReact } from 'ag-grid-react';
import { useState } from 'react';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { SetFilterModule } from 'ag-grid-enterprise';
import { Button } from './../components/Button';
import { useAgGridData } from '../hooks/useAgGridData';
import {
	getColumnDefs,
	getDefaultColDef,
	getRowStyle,
} from '../utils/UserTable.utils';

ModuleRegistry.registerModules([AllCommunityModule, SetFilterModule]);

const FILTER_BUTTONS = [
	{ label: 'Show Filters', value: true },
	{ label: 'Remove Filters', value: false },
];

const UserTable = () => {
	const { rowData, loading, error } = useAgGridData();
	const [showFilters, setShowFilters] = useState(true);

	const columnDefs = getColumnDefs();

	const defaultColDef = getDefaultColDef(showFilters);

	if (loading) {
		return (
			<div className="flex items-center justify-center h-96">
				<div className="text-lg text-gray-600">Loading AG Grid data...</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex items-center justify-center h-96">
				<div className="text-lg text-red-600">Error loading data: {error}</div>
			</div>
		);
	}

	return (
		<article className="space-y-4">
			<nav className="flex justify-end gap-2">
				{FILTER_BUTTONS.map(({ label, value }) => (
					<Button
						key={label}
						onClick={() => setShowFilters(value)}
						type="button"
						variant={showFilters === value ? 'primary' : 'secondary'}
					>
						{label}
					</Button>
				))}
			</nav>
			<div
				className="ag-theme-quartz"
				style={{ height: 'calc(100vh - 12rem)', width: '100%' }}
			>
				<AgGridReact
					rowData={rowData}
					columnDefs={columnDefs}
					getRowStyle={getRowStyle}
					defaultColDef={defaultColDef}
					pagination={true}
					paginationPageSize={10}
					paginationPageSizeSelector={[10, 20, 50]}
					animateRows={true}
				/>
			</div>
		</article>
	);
};

export default UserTable;
