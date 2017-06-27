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
	selector: 'ship-detail',
	template: `
	
		<div>
		  <h4>Cargo on your ship {{ships[0].name}}</h4>
			<table>
	    		<tr *ngFor="let cargo of ships[0].cargo; let i  = index">
	    			<td>{{commodities[i]}}</td>
	    			<td>{{cargo}}</td>
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

export class ShipDetailComponent {
  	players: Player[];
  	ships: Ship[];
  	ports: Port[];
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
	}
}