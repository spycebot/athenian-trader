import { Component, OnInit } 		from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';
import { Location }					from '@angular/common';
import { Player } 					from './player';
import { Ship } 					from './ship';
import { Port } 					from './port';
import { PlayerService }			from './player.service';
import { ShipService }				from './ship.service';
import { PortService }				from './port.service';

@Component({
	selector: 'port',
	template: `
		<div>
			<h3>The Port of {{ports[1].name}}</h3>
			<p>Buy and sell! Here are the local prices. What they are selling is what you are buying. Click on a price to buy or sell.</p>
			<input type="button" value="Set Sail" routerLink="/port/set-sail" />
			<input type="button" value="Trade" routerLink="/port/trade" />
			<input type="button" value="Visit Warehouse" disabled />
			<input type="button" value="Borrow Money" disabled />
		</div>
	`,
	providers: [ PlayerService ]
})

export class PortComponent {
  	players: Player[];
  	ships: Ship[];
  	ports: Port[];
	constructor(
		private playerService: PlayerService,
		private shipService: ShipService,
		private portService: PortService
	) { }

	/* getPlayer(): void {
		this.player = this.playerService.getPlayer();
	} */

	ngOnInit(): void {
		this.players = this.playerService.getPlayers();
		this.ships = this.shipService.getShips();
		this.ports = this.portService.getPorts();
	}
}