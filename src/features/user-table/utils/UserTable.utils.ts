import type {
	CellClassParams,
	CellStyle,
	ColDef,
	RowClassParams,
} from 'ag-grid-community';
import { UserThumbnail } from '../components/UserThumbnail';
import type { UserProps } from '../models/user.model';

export const getRowStyle = (params: RowClassParams<UserProps>) => {
	return params.data?.gender === 'female'
		? { borderLeft: '4px solid #ec4899' }
		: { borderLeft: '4px solid #3b82f6' };
};

export const getCellStyle = (
	_params: CellClassParams<UserProps>
): CellStyle => {
	return {
		padding: '8px',
		fontSize: '16px',
		color: '#374151',
	};
};

const AGE_STYLES = {
	young: { backgroundColor: '#e8f5e9', color: '#2e7d32' },
	senior: { backgroundColor: '#fff3e0', color: '#e65100' },
	default: { backgroundColor: '#e3f2fd', color: '#1565c0' },
};

const GENDER_STYLES = {
	female: {
		backgroundColor: '#fce4ec',
		color: '#c2185b',
		fontWeight: 'bold' as const,
	},
	male: {
		backgroundColor: '#e3f2fd',
		color: '#1976d2',
		fontWeight: 'bold' as const,
	},
};

const getAgeCellStyle = (params: CellClassParams<UserProps>) => {
	if (params.value < 30) return AGE_STYLES.young;
	if (params.value > 60) return AGE_STYLES.senior;
	return AGE_STYLES.default;
};

const getGenderCellStyle = (params: CellClassParams<UserProps>) => {
	return params.value === 'female' ? GENDER_STYLES.female : GENDER_STYLES.male;
};

export const getColumnDefs = (): ColDef<UserProps>[] => {
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
			cellStyle: getAgeCellStyle,
		},
		{
			field: 'dob.date',
			headerName: 'DOB',
			filter: 'agDateColumnFilter',
			valueGetter: (p) => new Date(p.data?.dob.date ?? 0),
			valueFormatter: (p) => new Date(p.value).toLocaleDateString(),
			cellStyle: getCellStyle,
		},
		{
			field: 'city',
			headerName: 'City',
			filter: 'agSetColumnFilter',
			cellStyle: getCellStyle,
		},
		{
			field: 'gender',
			filter: 'agSetColumnFilter',
			cellStyle: getGenderCellStyle,
		},
		{
			field: 'thumbnailPicture',
			headerName: 'Picture',
			cellRenderer: UserThumbnail,
			filter: false,
		},
	];
};

export const getDefaultColDef = (showFilters: boolean): ColDef => ({
	sortable: true,
	resizable: true,
	filter: true,
	floatingFilter: showFilters,
});
