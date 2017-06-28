export class Player {
  	id: number;
  	name: string;
  	duckets: number;
  	destination: number;
  	currentPort: number;
  	ship: number;

  	constructor() {
	  	this.id = 0;
	  	this.name = 'Prometheus';
	  	this.duckets = 0;
	  	this.destination = 0;
	  	this.currentPort = 0;
	  	this.ship = 0;
  	}
  }
