import { useEffect, useState } from 'react';
import type { UserProps } from '../models/user.model';
import { fetchUsers } from '../services/apiService';

export const useAgGridData = () => {
	const [rowData, setRowData] = useState<UserProps[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let isMounted = true;

		fetchUsers()
			.then((data) => {
				if (!isMounted) return;
				setRowData(data);
				setError(null);
			})
			.catch(() => {
				if (!isMounted) return;
				setRowData([]);
				setError('Failed to fetch user data');
			})
			.finally(() => {
				if (!isMounted) return;
				setLoading(false);
			});

		return () => {
			isMounted = false;
		};
	}, []);

	return { rowData, loading, error };
};
