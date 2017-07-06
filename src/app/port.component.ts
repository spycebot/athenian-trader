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
				<p>The Athenian temple priest Rhonbos approaches and askes if you will make a temple donation of {{donation}} duckets.</p>
				<input type="button" value="No Thanks" (click)="declineDonation()"/>
				<input type="button" value="Make Donation" [disabled]="player.duckets < donation" (click)="makeDonation()" />
				<input type="button" value="Borrow {{donation}} for Donation" (click)="duressBorrow(donation)"/>
				<!-- the word among sailors is that you are wanted back in Athens -->
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
			<p>payDues: {{payDues}}</p>
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
  	donation: number;
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
		if (this.port.name == "Athens") {
			if (this.evaluateVictory()) {
				this.win = true; ;
			} else if (this.templeTax()) {
				this.payDues = true;
				this.donation = Math.round(Math.random() * 227);
			} 
		}
	}

	evaluateVictory(): boolean {
		let victory: number; // very low  = 10000
		let result: boolean = false;
		victory = this.player.victory;
		if (this.player.duckets > victory) { 
			//this.win = true; 
			result = true;
		} 
		return result;
	}

	templeTax(): boolean {
		let result: boolean = false;
		let rando: number;
		rando = Math.random();
		if (rando < 0.25) result = true;
		return result;
	}

	makeDonation(): void {
		this.payDues = false;
		this.player.duckets = this.player.duckets - this.donation;
	}

	declineDonation(): void {
		this.payDues = false;
	}

	duressBorrow(c): void {
		this.player.debt = +this.player.debt + c;
		this.payDues = false;
	}
}