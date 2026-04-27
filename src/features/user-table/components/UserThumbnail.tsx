import type { ICellRendererParams } from 'ag-grid-community';
import type { UserProps } from '../models/user.model';

const THUMBNAIL_STYLES = {
	width: 40,
	height: 40,
	borderRadius: '50%',
	objectFit: 'cover' as const,
};

export const UserThumbnail = (params: ICellRendererParams<UserProps>) => {
	const value = params.value as string | undefined;

	if (!value) return null;

	return <img src={value} alt="User" style={THUMBNAIL_STYLES} />;
};
