import axios from 'axios';
import type { UserProps } from '../models/user.model';

export const fetchUsers = async (): Promise<UserProps[]> => {
	const userResponse = await axios.get('https://randomuser.me/api/?results=50');
	return userResponse.data.results;
};
