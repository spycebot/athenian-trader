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
			<h3>The Port of {{ports[0].name}}</h3>
			<p>Buy and sell! Here are the local prices. What they are selling is what you are buying. Click on a price to buy or sell.</p>
			<table>
			<tr><th>Commodity</th><th>Sell</th><th>Buy</th>
			<tr *ngFor="let commodity of commodities; let i = index">
				<td>{{commodity}}</td>
				<td (click)="sell(commodity, i, port.sellPrice[i])">{{port.sellPrice[i]}}</td>
				<td (click)="buy(commodity, i, port.buyPrice[i])">{{port.buyPrice[i]}}</td>
			</tr>
			</table>
			<input type="button" value="Set Sail" disabled />
			<input type="button" value="Trade" routerLink="/trade" />
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