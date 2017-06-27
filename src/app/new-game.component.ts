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
					<td><input [(ngModel)]="players[0].name" placeholder="Player Name"></td>
				</tr>
				<tr>
					<td>Ship: </td>
					<td><input [(ngModel)]="ships[0].name" placeholder="Ship Name"></td>
				</tr>
			</table>
		  	<input type="button" value="Next" routerLink="/win" />
		</div>
	`,
	providers: [ PlayerService ]
})

export class NewGameComponent {
  	players: Player[];
  	ships: Ship[];
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
	}
}