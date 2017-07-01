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
	selector: 'port',
	styles: [`
		img { width: 256px; }
		table, th, td {
			    border: 1px solid black;
			    border-collapse: collapse;
		}
		td, th { padding: 2px; }
	`],
	template: `
		<div>
			<h2>Markets Overview</h2>
			<table>
				<tr>
					<th>Market</th>
					<th *ngFor="let com of commodities">
						(Buy, Sell)
					</th>
				</tr>
				<tr *ngFor="let market of ports">
					<td>{{market.name}}</td>
					<td *ngFor="let com of market.stock; let i = index">
						{{market.buyPrice[i] | number:'1.0-0'}}, {{market.sellPrice[i] | number:'1.0-0'}}
						({{market.buyPrice[i]}}, {{market.sellPrice[i]}})
					</td>
				</tr>
			</table>
			<input type="button" value="Back" (click)="goBack()" /> ｜
			<input type="button" value="Modify Prices" (click)="modifyPrices()" /> 
		</div>
	`,
	providers: [ PlayerService ]
})

export class MarketsComponent {
  	players: Player[];
  	ships: Ship[];
  	ports: Port[];
  	player: Player;
  	port: Port;
  	commodities = COMMODITIES;

	constructor(
		private playerService: PlayerService,
		private shipService: ShipService,
		private portService: PortService,
		private location: Location
	) { }

	ngOnInit(): void {
		this.players = this.playerService.getPlayers();
		this.ships = this.shipService.getShips();
		this.ports = this.portService.getPorts();
		this.player = this.players[0];
		this.port = this.ports[this.player.currentPort];
	}

	goBack(): void {
	  this.location.back();
	}

	modifyPrices(): void {
		let sampleBaseDifferential: number;
		let sampleRandomDifferential: number;
		for (let port of this.ports) {
			for (let i in this.commodities) {
				let baseDifferential: number = 0.05;
				let randomDifferential: number = Math.random() / 10;
				if (port.buyPrice[i] - (port.buyPrice[i] * (baseDifferential - randomDifferential)) > 0) {
					port.buyPrice[i] = port.buyPrice[i] + (port.buyPrice[i] * (baseDifferential - randomDifferential)); // Math.floor()
					port.sellPrice[i] = port.buyPrice[i] - (port.buyPrice[i] * (baseDifferential - randomDifferential)); // Math.floor()

				}
				sampleBaseDifferential = baseDifferential;
				sampleRandomDifferential = randomDifferential;
			}
		}
		console.log(
			"MarketsComponent:modifyPrices:sampleBaseDifferential: " 
			+ sampleBaseDifferential 
			+ "; sampleRandomDifferential: " 
			+ sampleRandomDifferential 
			+ "; sum: " 
			+ (sampleBaseDifferential - sampleRandomDifferential)
		);
	}
}