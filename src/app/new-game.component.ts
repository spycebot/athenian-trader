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
					<td colspan="2">
						<form action="">
						  <input type="radio" name="gender" value="easy" (click)="setVictory(10000)" checked> Easy
						  <input type="radio" name="gender" value="medium" (click)="setVictory(100000)"> Medium
						  <input type="radio" name="gender" value="hard" (click)="setVictory(1000000)"> Hard
						</form>
					</td>
				</tr>
				<tr>
					<td>Victory: </td>
					<td><input [(ngModel)]="player.victory" placeholder="Victory" disabled /></td>
				</tr>
			</table>
		  	<input type="button" value="Start Game" routerLink="/port" (click)="setPrices()" />
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
		this.randomiseMarkets();
	}

	setPrices(): void {
		/* Call in a logical component
		for (let port of )
			*/
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
}