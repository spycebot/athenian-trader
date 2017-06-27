import { Component, OnInit } 		from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';
import { Location }					from '@angular/common';
import { Player } 					from './player';
import { PlayerService }			from './player.service';

@Component({
	selector: 'win',
	template: `
	
		<div>
		  <h2>You have won!</h2>
		  <p>Congratulations my friend. You have enough money to retire in style. You will enjoy life with your fortune of {{players[0].duckets}} duckets, recouning your glory days.</p>
		  <input type="button" value="Play Again" routerLink="/new-game" />
		</div>
	`,
	providers: [ PlayerService ]
})

export class WinComponent {
  	players: Player[];
	constructor(
		private playerService: PlayerService
	) { }

	/* getPlayer(): void {
		this.player = this.playerService.getPlayer();
	} */

	ngOnInit(): void {
		this.players = this.playerService.getPlayers();
	}
}