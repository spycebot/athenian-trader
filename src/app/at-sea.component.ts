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
		this.modifyStock();
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
}