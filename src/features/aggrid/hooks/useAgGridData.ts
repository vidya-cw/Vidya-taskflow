import { useEffect, useState } from 'react';
import type { UserProps } from '../models/user.model';
import { fetchUsers } from '../services/apiService';

export const useAgGridData = () => {
	const [data, setData] = useState<UserProps[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchUsers()
			.then(setData)
			.finally(() => setLoading(false));
	}, []);

	return { data, loading };
};
