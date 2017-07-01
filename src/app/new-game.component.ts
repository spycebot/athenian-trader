import { Component, OnInit } 		from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';
import { Location }					from '@angular/common';
import { Player } 					from './player';
import { Ship } 					from './ship';
import { PlayerService }			from './player.service';
import { ShipService }				from './ship.service';

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
					<td><input [(ngModel)]="ships[player.ship].name" placeholder="Ship Name" /></td>
				</tr>
				<tr>
					<td>Cash: </td>
					<td><input [(ngModel)]="player.duckets" placeholder="Cashola" /></td>
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
  	player: Player;
	constructor(
		private playerService: PlayerService,
		private shipService: ShipService
	) { }

	/* getPlayer(): void {
		this.player = this.playerService.getPlayer();
	} */

	ngOnInit(): void {
		this.players = this.playerService.getPlayers();
		this.ships = this.shipService.getShips();
		//this.players[0].currentPort = 1;
		this.player = this.players[0];
		this.player.currentPort = 0;
		this.player.ship = 1;
	}

	setPrices(): void {
		/* Call in a logical component
		for (let port of )
			*/
	}

	setVictory(t: number):void {
		this.player.victory = t;
	}
}