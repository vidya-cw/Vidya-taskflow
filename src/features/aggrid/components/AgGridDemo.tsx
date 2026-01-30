import type { ColDef, ICellRendererParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useMemo, useState } from 'react';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { SetFilterModule } from 'ag-grid-enterprise';
import { useAgGridData } from '../hooks/useAgGridData';
import type { UserProps } from '../models/user.model';
import { getCellStyle, getRowStyle } from '../utils/gridUtils';
import type {  } from 'ag-grid-community'


ModuleRegistry.registerModules([AllCommunityModule, SetFilterModule]);

const AgGridDemo = () => {
	const { data, loading } = useAgGridData();
	const [showFilters, setShowFilters] = useState(true);

	const columnDefs: ColDef<UserProps>[] = useMemo(() => {
		if (data.length === 0) return [];

		return [
			{
				field: 'name.first',
				headerName: 'First Name',
				filter: 'agTextColumnFilter',
				cellStyle: getCellStyle,
			},
			{
				field: 'name.last',
				headerName: 'Last Name',
				filter: 'agTextColumnFilter',
				cellStyle: getCellStyle,
			},
			{
				field: 'email',
				filter: 'agTextColumnFilter',
				cellStyle: getCellStyle,
				cellClass: 'font-mono text-sm',
			},
			{
				field: 'phone',
				filter: 'agTextColumnFilter',
				cellStyle: getCellStyle,
			},
			{
				field: 'dob.age',
				headerName: 'Age',
				filter: 'agNumberColumnFilter',
				cellStyle: (params) => {
					if (params.value < 30)
						return { backgroundColor: '#e8f5e9', color: '#2e7d32' };
					if (params.value > 60)
						return { backgroundColor: '#fff3e0', color: '#e65100' };
					return { backgroundColor: '#e3f2fd', color: '#1565c0' };
				},
			},
			{
				field: 'dob.date',
				headerName: 'DOB',
				filter: 'agDateColumnFilter',
				valueFormatter: (p) => new Date(p.value).toLocaleDateString(),
				cellStyle: getCellStyle,
			},
			{
				field: 'location.city',
				headerName: 'City',
				filter: 'agSetColumnFilter',
				cellStyle: getCellStyle,
			},
			{
				field: 'gender',
				filter: 'agSetColumnFilter',
				cellStyle: (params) => {
					return params.value === 'female'
						? {
								backgroundColor: '#fce4ec',
								color: '#c2185b',
								fontWeight: 'bold',
							}
						: {
								backgroundColor: '#e3f2fd',
								color: '#1976d2',
								fontWeight: 'bold',
							};
				},
			},
			{
				field: 'picture.thumbnail',
				headerName: 'Picture',
				cellRenderer: (params: ICellRendererParams<UserProps>) => {
					if (!params.value) return null;

					return (
						<img
							src={params.value as string}
							alt="User"
							style={{
								width: 40,
								height: 40,
								borderRadius: '50%',
								objectFit: 'cover',
							}}
						/>
					);
				},
				filter: false,
			},
		];
	}, [data]);

	const defaultColDef: ColDef = useMemo(
		() => ({
			sortable: true,
			resizable: true,
			filter: true,
			floatingFilter: showFilters,
		}),
		[showFilters]
	);

	if (loading) {
		return (
			<div className="flex items-center justify-center h-96">
				<div className="text-lg text-gray-600">Loading AG Grid data...</div>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			<div className="flex justify-end gap-2">
				<button
					onClick={() => setShowFilters(true)}
					type="button"
					className={`px-4 py-2 rounded-lg font-medium transition-colors ${
						showFilters
							? 'bg-blue-600 text-white'
							: 'bg-gray-300 text-gray-700 hover:bg-gray-400'
					}`}
				>
					Show Filters
				</button>
				<button
					onClick={() => setShowFilters(false)}
					type="button"
					className={`px-4 py-2 rounded-lg font-medium transition-colors ${
						!showFilters
							? 'bg-blue-600 text-white'
							: 'bg-gray-300 text-gray-700 hover:bg-gray-400'
					}`}
				>
					Remove Filters
				</button>
			</div>
			<div className="ag-theme-quartz" style={{ height: 550, width: '100%' }}>
				<AgGridReact
					rowData={data}
					columnDefs={columnDefs}
					getRowStyle={getRowStyle}
					defaultColDef={defaultColDef}
					pagination={true}
					paginationPageSize={10}
					paginationPageSizeSelector={[10, 20, 50]}
					animateRows={true}
				/>
			</div>
		</div>
	);
};

export default AgGridDemo;
