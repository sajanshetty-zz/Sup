export class User {
	id: number;
	name: string;
	email: string;
	password: string;
	isAdmin: boolean;
	createdAt?: string;
	updatedAt?: string;

	constructor(
		id: number,
		name: string,
		email: string,
		password: string,
		isAdmin: boolean,
		createdAt?: string,
		updatedAt?: string,
	){
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
		this.isAdmin = isAdmin;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
}
