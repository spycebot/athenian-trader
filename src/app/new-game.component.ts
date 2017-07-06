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
	selector: 'new-game',
	template: `
	
		<div>
		  <h2>New Game</h2>
		  <p></p>
			<table>
				<tr>
					<td>Name: </td>
					<td><input [(ngModel)]="player.name" placeholder="Player Name" /></td>
				</tr>
				<tr>
					<td>Ship: </td>
					<td><input [(ngModel)]="ship.name" placeholder="Ship Name" /></td>
				</tr>
				<tr>
					<td>Cash: </td>
					<td><input [(ngModel)]="player.duckets" placeholder="Cashola" disabled /></td>
				</tr>
				<tr>
					<td>Debt: </td>
					<td><input [(ngModel)]="player.debt" placeholder="Liability" disabled /></td>
				</tr>
				<tr>
					<td colspan="2">
						<form action="">
						  <input type="radio" name="difficulty" value="easy" (click)="setVictory(10000)" checked> Easy
						  <input type="radio" name="difficulty" value="medium" (click)="setVictory(100000)"> Medium
						  <input type="radio" name="difficulty" value="hard" (click)="setVictory(1000000)"> Hard
						  <input type="checkbox" name="chooseDebt" value="Debt" (click)="toggleDebt()" />Debt
						</form>
					</td>
				</tr>
				<tr>
					<td>Victory: </td>
					<td><input [(ngModel)]="player.victory" placeholder="Victory" disabled /></td>
				</tr>
			</table>
		  	<input type="button" value="Start Game" routerLink="/port" />
		</div>
	`,
	providers: [ PlayerService ]
})

export class NewGameComponent {
  	players: Player[];
  	ships: Ship[];
  	ports: Port[];
  	commodities = COMMODITIES;
  	player: Player;
  	ship: Ship;
  	startWithDebt: boolean;
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
		//this.players[0].currentPort = 1;
		this.player = this.players[0]; 
		//this.player.currentPort = 0;
		this.player.ship = 1; // workaround for proper initialization
		this.player.duckets = 1000; // traditional game as the option of debt
		this.ship = this.ships[this.player.ship];
		this.ship.cargo = [0, 0, 0, 0];
		this.ship.available = this.ship.size;
		this.randomiseMarkets();
		this.player.warehouse = [0, 0, 0, 0];
		this.player.size = 1000;
		this.player.debt = 0;
		this.startWithDebt = false;
	}

	setVictory(t: number):void {
		this.player.victory = t;
	}

	modifyPrices(): void {
		for (let port of this.ports) {
			for (let i in this.commodities) {
				let baseDifferential: number = 0.05;
				let randomDifferential: number = Math.random() / 10;
				if (port.buyPrice[i] - (port.buyPrice[i] * (baseDifferential - randomDifferential)) > 0) {
					port.buyPrice[i] = port.buyPrice[i] + (port.buyPrice[i] * (baseDifferential - randomDifferential)); // Math.floor()
					port.sellPrice[i] = port.buyPrice[i] - (port.buyPrice[i] * randomDifferential); 
				}
			}

		}

	}

	randomiseMarkets(): void {
		for (var i = 0; i < 4; i++) {
			this.modifyPrices();
			console.log("Another round of modification!");
		}
	}

	toggleDebt(): void {
		this.startWithDebt = !this.startWithDebt;
		if (this.startWithDebt) { 
			this.player.duckets = this.player.duckets + 3000;
			this.player.debt = this.player.debt + 3000;
		} else {
			this.player.duckets = this.player.duckets - 3000;
			this.player.debt = this.player.debt - 3000;

		}
	}
}