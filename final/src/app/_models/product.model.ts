export class Product {
	id: number;
	name: string;
	color: string;
	size: string;
	price: number;
	createdAt: string;
	updatedAt: string;
	image?: string;

	constructor(
		id: number,
		name: string,
		color: string,
		size: string,
		price: number,
		createdAt: string,
		updatedAt: string,
		image?: string,
	){
		this.id = id;
		this.name = name;
		this.color = color;
		this.size = size;
		this.price = price;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.image = image;
	}
}
