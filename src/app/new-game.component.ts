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
					<td><input [(ngModel)]="currentPlayer.name" placeholder="Player Name"></td>
				</tr>
				<tr>
					<td>Ship: </td>
					<td><input [(ngModel)]="ships[0].name" placeholder="Ship Name"></td>
				</tr>
				<tr>
					<td>Cash: </td>
					<td><input [(ngModel)]="currentPlayer.duckets" placeholder="Cashola"></td>
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
  	currentPlayer: Player;
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
		this.currentPlayer = this.players[0];
		this.currentPlayer.currentPort = 1;
		this.currentPlayer.ship = 1;
	}
}