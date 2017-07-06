import { Component, OnInit } 		from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';
import { Location }					from '@angular/common';
import { Player } 					from './player';
import { Ship } 					from './ship';
import { Port } 					from './port';
import { PlayerService }			from './player.service';
import { ShipService }				from './ship.service';
import { PortService }				from './port.service';

import { COMMODITIES } 				from './commodities';

@Component({
	selector: 'trade',
	styles: [`
			ship-detail { float: left; }
			img { width : 256px; }
		`],
	template: `
		<div>
			<h3>At Sea</h3>
			<img src="assets/at-sea.jpg" alt="At sea painting" />
			<p>It is smooth saling, {{player.name}}. We are arriving at {{ports[+player.destination].name}}.</p>
			
			<input type="button" value="Next" (click)="arriveAtPort()" routerLink="/port" />
		</div>
	`,
	providers: [ PlayerService ]
})

export class AtSeaComponent {
  	players: Player[];
  	ships: Ship[];
  	ports: Port[];
  	player: Player;
  	commodities = COMMODITIES;
	constructor(
		private playerService: PlayerService,
		private shipService: ShipService,
		private portService: PortService,
		private route: ActivatedRoute,
		private location: Location
	) { }

	ngOnInit(): void {
		this.players = this.playerService.getPlayers();
		this.ships = this.shipService.getShips();
		this.ports = this.portService.getPorts();
		this.player = this.players[0];
		//this.modifyStock();
		//this.setTargets(); //if ( true ) 
		this.modifyPrices();
	}

	arriveAtPort(): void {
		this.player.currentPort = this.player.destination;
	}

	modifyStock(): void {
		for (let port of this.ports) {
			for (let i in this.commodities) {
				port.stock[i] = Math.ceil(+port.stock[i] + (+port.stock[i]* ((Math.random() * 0.1) - 0.05)));

			}
		}
	}

	setTargets(): void {
		console.log("AtSeaComponent:setTargets");
		let sensitivity = 0.1;
		for (let port of this.ports) {
			for (let com of port.target) {
				com = Math.round(+com + (+com * ((Math.random() * sensitivity) - sensitivity/2)));
				console.log("com: " + com);
			}
		}
	}

	modifyPrices(): void {
		// this function exists on three components :0(
		for (let port of this.ports) {
			for (let i in this.commodities) {
				let baseDifferential: number = 0.05;
				let randomDifferential: number = Math.random() / 10;
				if (port.buyPrice[i] - (port.buyPrice[i] * (baseDifferential - randomDifferential)) > 0) {
					port.buyPrice[i] = port.buyPrice[i] + (port.buyPrice[i] * (baseDifferential - randomDifferential)); // Math.floor()
					port.sellPrice[i] = port.buyPrice[i] - (port.buyPrice[i] * randomDifferential); // Math.floor() (baseDifferential - )

				}
			}
		}
		if (this.player.debt > 0) {
			this.player.debt = this.player.debt + (this.player.debt * 0.02);
		} else if (this.player.debt < 0) {
			this.player.debt = this.player.debt + (this.player.debt * 0.006);
		}
	}
}