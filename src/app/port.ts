export class Port {
	id: number;
	name: string;
	stock: number[];
	sellPrice: number[];
	buyPrice: number[];
	target: number[];

	constructor() {
		this.id = 0,
		this.name = 'NONE',
		this.stock = [0, 0, 0, 0],
		this.sellPrice = [0, 0, 0, 0],
		this.buyPrice = [0, 0, 0, 0],
		this.target = [0, 0, 0, 0]
	}
}