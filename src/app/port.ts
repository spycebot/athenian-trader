export class Port {
	id: Number;
	name: string;
	stock: Number[];
	sellPrice: Number[];
	buyPrice: Number[];

	constructor() {
		this.id = 0,
		this.name = 'NONE',
		this.stock = [0, 0, 0, 0];
		this.sellPrice = [0, 0, 0, 0];
		this.buyPrice = [0, 0, 0, 0];
	}
}