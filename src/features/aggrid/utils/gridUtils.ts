import type { CellStyle, RowClassParams, CellClassParams } from 'ag-grid-community';
import type { UserProps } from '../models/user.model';

export const getRowStyle = (params: RowClassParams<UserProps>) => {
    return params.data?.gender === 'female'
        ? { borderLeft: '3px solid #ec4899' }
        : { borderLeft: '3px solid #3b82f6' };
};

export const getCellStyle = (_params: CellClassParams<UserProps>): CellStyle => {
    return {
        padding: '8px',
        fontSize: '14px',
        color: '#374151',
    };
};
