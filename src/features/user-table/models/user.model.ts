type nameType = { first: string; last: string };
type dobType = { date: string; age: number };

export interface UserProps {
	gender: string;
	name: nameType;
	email: string;
	phone: string;
	dob: dobType;
	city: string;
	thumbnailPicture: string;
}
