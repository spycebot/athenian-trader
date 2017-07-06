import { Component, OnInit } 		from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';
import { Location }					from '@angular/common';
import { Player } 					from './player';
import { Ship } 					from './ship';
import { Port } 					from './port';
import { PlayerService }			from './player.service';
import { ShipService }				from './ship.service';
import { PortService }				from './port.service';

//import { COMMODITIES }				from './commodities';

@Component({
	selector: 'port',
	styles: [`
		img { width: 256px; }
	`],
	template: `
		<div>
			<h2>The Port of {{port.name}}</h2>
			<div *ngIf="payDues">
				<p>The Athenian temple priest Donal approaches and askes if you will make a contribution of 100 duckets.</p>
			</div>
			<div *ngIf="!payDues">
				<div  *ngIf="!win">
					<img src="assets/1024px-akropolis_by_leo_von_klenze1.jpg"  alt="Leo von Klenze" />
					<p>Welcome to {{port.name}}, {{player.name}}. Visit the teeming market to trade! You can store excess cargo in your warehouse. The money lender can help in a pinch.</p>
					<!-- p>win: {{win}}</p -->
					<input type="button" value="Set Sail" routerLink="/port/set-sail" />
					<input type="button" value="Trade" routerLink="/port/trade" />
					<input type="button" value="Warehouse" routerLink="/port/warehouse" [disabled]="port.name != 'Athens'" />
					<input type="button" value="Money Lender" routerLink="/port/money-lender" [disabled]="port.name != 'Athens'" />
				</div>
				<div *ngIf="win">
					<img src="assets/louvre-allegorie-fortune-fortuna-marina.jpg">
					<p>Hot diggity! Reckoning says you have enough money to retire, {{player.name}}.</p>
					<!-- p>win: {{win}}</p -->
					<input type="button" value="Win" routerLink="/win" />
				</div>
			</div>
		</div>
	`,
	providers: [ PlayerService ]
})

export class PortComponent {
  	players: Player[];
  	ships: Ship[];
  	ports: Port[];
  	player: Player;
  	port: Port;
  	win: boolean = false;
  	payDues: boolean = false;
  	//victory: numbe
  	//commodities = COMMODITIES;

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
		//console.log("PortComponent port.landscape: " + this.port.landscape);
		//this.modifyStock();
		if (this.port.name == "Athens") this.evaluatePlayer();
	}

	evaluatePlayer(): void {
		let victory: number; // very low  = 10000
		victory = this.player.victory;
		if (this.player.duckets > victory) { 
			this.win = true; 
		}
		console.log("PortComponent:evaluatePlayer:");
	}
}