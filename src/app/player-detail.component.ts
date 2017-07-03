import { Component, OnInit } 		from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';
import { Location }					from '@angular/common';
import { Player } 					from './player';
import { Ship } 					from './ship';
import { Port } 					from './port';
import { PlayerService }			from './player.service';
import { ShipService }				from './ship.service';
import { PortService }				from './port.service';

import { COMMODITIES }				from './commodities';

@Component({
	selector: 'player-detail',
	template: `
	
		<div>
		  <h4>Player Summary</h4>
			<table>
	    		<tr>
	    			<td>Name: </td>
	    			<td>{{player.name}}</td>
				</tr>
	    		<tr>
	    			<td>Duckets: </td>
	    			<td>{{players[0].duckets}}</td>
				</tr>
	    		<tr>
	    			<td>Ship Hold: </td>
	    			<td>{{ships[player.ship].size}}({{ships[player.ship].available}})</td>
				</tr>
	    		<tr>
	    			<td>Warehouse: </td>
	    			<td>{{player.size}}({{warehouseAvailable()}})</td>
				</tr>
			</table>
		</div>
	`,
	providers: [ 
		PlayerService,
		ShipService,
		PortService
	]
})

export class PlayerDetailComponent {
  	players: Player[];
  	ships: Ship[];
  	ports: Port[];
  	player: Player;
  	commodities = COMMODITIES;
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
		this.player = this.players[0];
		if (!this.player.size) {
			this.player.warehouse = [1, 1, 1, 1];
			this.player.size = 900;
		}
	}

	warehouseAvailable(): number {
		let available: number = this.player.size;
		//let used: number = 0;
		for (let com of this.player.warehouse) {
			available = +available - +com;	
			//console.log("PlayerDetailComponent:warehouseAvailable:com: " + com + "; available: " + available);
		}
		//available = this.player.size - this.player.warehouse[0..4];
		return available;
	}
}