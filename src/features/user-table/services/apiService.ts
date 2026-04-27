import axios from 'axios';
import { RANDOM_USER_API_URL } from '../../../constants/api';
import type { UserProps } from '../models/user.model';

export const fetchUsers = async (): Promise<UserProps[]> => {
	const userResponse = await axios.get(RANDOM_USER_API_URL);
	return userResponse.data.results;
};
