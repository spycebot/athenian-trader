import { Component, OnInit } 		from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';
import { Location }					from '@angular/common';
import { Player } 					from './player';
import { PlayerService }			from './player.service';

@Component({
	selector: 'lose',
	template: `
	
		<div>
		  <h2>You lost!</h2>
		  <p>The debt collectors have taken the remaining pottery and bail of rope. You are flat broke. I don't see how this gets better, {{players[0].name}}.</p>
		  <input type="button" value="Play Again" routerLink="/new-game" />
		</div>
	`,
	providers: [ PlayerService ]
})

export class LoseComponent {
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