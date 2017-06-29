import { Component, OnInit }	from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';

import { COMMODITIES }			from './commodities';

import { Player }				from './player';
import { Ship }					from './ship';
import { Port }					from './port';
import { PlayerService }		from './player.service';
import { ShipService }			from './ship.service';
import { PortService }			from './port.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Player]
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
    this.setPrices();
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

	setPrices(): void {
		for (let port of this.ports) {
			for (let i in this.commodities) {
				port.buyPrice[i] = Math.floor(+this.NUMERATOR / 0.833 / (+port.stock[i]));
				port.sellPrice[i] = Math.floor(+this.NUMERATOR / 1.25 / (+port.stock[i]));
			}
			/*
			port.buyPrice[0] = Math.floor(+this.NUMERATOR / 833.3 * (+port.stock[0]/1000));
			port.buyPrice[1] = Math.floor(+this.NUMERATOR / 83.33 * (+port.stock[1]/100));
			port.buyPrice[2] = Math.floor(+this.NUMERATOR / 8.333 * (+port.stock[2]/10));
			port.buyPrice[3] = Math.floor(+this.NUMERATOR / 0.833 * (+port.stock[3]));
			port.sellPrice[0] = Math.floor(+this.NUMERATOR / 1250 * (+port.stock[0]/1000));
			port.sellPrice[1] = Math.floor(+this.NUMERATOR / 125 * (+port.stock[1]/100));
			port.sellPrice[2] = Math.floor(+this.NUMERATOR / 12.5 * (+port.stock[2]/10));
			port.sellPrice[3] = Math.floor(+this.NUMERATOR / 1.25 * (+port.stock[3]));
			*/
			console.log("Port: " + port.name + ". Port wheat sell price: " + port.sellPrice[0]);

		}
	}
}
