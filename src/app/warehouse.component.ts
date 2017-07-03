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
	selector: 'warehouse',
	styles: [`
			ship-detail { float: left; }
			table input { width: 100%; }
		`],
	template: `
		<div>
			<h2>Your Warehouse in {{port.name}}</h2>
			<p>You have a place to store goods in {{port.name}}. There is security, I think.</p>
			<table>
				<tr><th></th><th>Load</th><th>Max</th><th>Store</th><th>Max</th></tr>
				<tr *ngFor="let commodity of commodities; let i = index">
					<td>{{commodity}}</td>
					<td><input type="button" (click)="loadGoods(i, 1)" value="<" /></td>
					<td><input type="button" (click)="loadGoods(i, calcMaxLoad(i))" value="{{calcMaxLoad(i)}}" /></td>
					<td><input type="button" (click)="storeGoods(i, 1)" value=">" /></td>
					<td><input type="button" (click)="storeGoods(i, calcMaxStore(i))" value="{{calcMaxStore(i)}}" />
					<td>{{player.warehouse[i]}}</td>
				</tr>
			</table>
			<ship-detail></ship-detail>
			<player-detail></player-detail>
			
			<input type="button" value="Back" (click)="goBack()" />
		</div>
	`,
	providers: [ PlayerService ]
})

export class WarehouseComponent {
  	players: Player[];
  	ships: Ship[];
  	ports: Port[];
  	player: Player;
  	ship: Ship;
  	port: Port;
  	commodities = COMMODITIES;
	constructor(
		private playerService: PlayerService,
		private shipService: ShipService,
		private portService: PortService,
		private route: ActivatedRoute,
		private location: Location
	) { }

	/* getPlayer(): void {
		this.player = this.playerService.getPlayer();
	} */

	ngOnInit(): void {
		this.players = this.playerService.getPlayers();
		this.ships = this.shipService.getShips();
		this.ports = this.portService.getPorts();
		this.player = this.players[0];
		this.ship = this.ships[this.player.ship];
		this.port = this.ports[this.player.currentPort];
	}

	goBack(): void {
	  this.location.back();
	}

	// load ship from warehouse
	// the lesser of (1) in warehouse (2) available space (3) ...
	calcMaxLoad(i: number, p: number): number {
		let cm: number;
		//cm = Math.trunc(this.ship.available - this.player.warehouse[i]); // Math.floor();
		if (this.ship.available <= this.player.warehouse[i]) { cm = this.ship.available; }
		else cm = this.player.warehouse[i];
		return cm;
	}

	// store goods in wareshore
	// the lesser of (1) in ship (2) wareshouse available (3) ...
	calcMaxStore(i: number, p: number): number { 
		let cm: number;
		let wh: number = this.warehouseAvailable();
		if (this.ship.cargo[i] <= wh) { cm = +this.ship.cargo[i]; }
		else cm = wh ;
		return cm;
	}

	loadGoods(i: number, c: number): void {
		if (this.player.warehouse[i] >= c) {
			this.ship.cargo[i] = +this.ship.cargo[i] + c;
			this.player.warehouse[i] = +this.player.warehouse[i] - c;
			this.ship.available = +this.ship.available - c;
		}
	}

	storeGoods(i: number, c: number): void {
		if (this.ship.cargo[i] >= c) {
			this.ship.cargo[i] = +this.ship.cargo[i] - c;
			this.player.warehouse[i] = +this.player.warehouse[i] + c;
			this.ship.available = +this.ship.available + c;
		}

	}

	warehouseAvailable(): number {
		// function exists in two places
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