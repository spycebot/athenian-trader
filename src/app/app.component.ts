import { Component, OnInit }	from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';

import { COMMODITIES }			from './commodities';

import { Player }				from './player';
import { Ship }					from './ship';
import { Port }					from './port';

import { PlayerService }		from './player.service';
import { ShipService }			from './ship.service';
import { PortService }			from './port.service';

import { MarketsComponent }		from './markets.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Player, Port]
})

export class AppComponent {
	commodities = COMMODITIES;
	players: Player[];
	ports: Port[];
	ships: Ship[];
	destination: number = 0;
	shipIndex: number = 1;
	portIndex: number = 1;
	atDebug: boolean = false;
	NUMERATOR: Number = 10000;

	constructor(
		private playerService: PlayerService,
		private shipService: ShipService,
		private portService: PortService,
		private player: Player
	) { }


	ngOnInit(): void {
		this.getPlayers();
		this.getShips();
		this.getPorts();
		//this.modifyStock();
		this.modifyPrices();
	}

	getPlayers(): void {
		this.players = this.playerService.getPlayers();
	}

	getShips(): void {
		this.ships = this.shipService.getShips();
	}

	getPorts(): void {
		this.ports = this.portService.getPorts();
	}

	toggleDebug(): void {
		this.atDebug = !this.atDebug;
	}

	setPricesFromStock(): void {
		for (let port of this.ports) {
			for (let i in this.commodities) {
				// Price is based on stock, but a bit random
				let baseDifferential: number = 0.05;
				let randomDifferential: number = Math.random() / 10;

				//baseDifferential = 0.15;
				port.buyPrice[i] = Math.floor(+this.NUMERATOR / ( 1 - (baseDifferential + randomDifferential)) / (+port.stock[i])); //0.833
				port.sellPrice[i] = Math.floor(+this.NUMERATOR / ( 1 + (baseDifferential + randomDifferential)) / (+port.stock[i])); //1.25
				//console.log("Port: " + port.name + ". Port wheat sell price: " + port.sellPrice[0] + ", baseDifferential: " + baseDifferential + ", randomDifferential: " + randomDifferential);
			}

		}
	}

	modifyPrices(): void {
		for (let port of this.ports) {
			for (let i in this.commodities) {
				let baseDifferential: number = 0.05;
				let randomDifferential: number = Math.random() / 10;
				port.buyPrice[i] = port.buyPrice[i] + (port.buyPrice[i] * (baseDifferential + randomDifferential)); // Math.floor()
				port.sellPrice[i] = port.buyPrice[i] - (port.buyPrice[i] * (baseDifferential + randomDifferential)); 
			}

		}

	}

	modifyStock(): void {
		for (let port of this.ports) {
			for (let i in this.commodities) {
				port.stock[i] = Math.ceil(+port.stock[i] + (+port.stock[i]* ((Math.random() * 0.1) - 0.05)));

			}
			console.log("Port: " + port.name + ". Port wheat sell price: " + port.sellPrice[0]);

		}
	}
}
