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
		  <img src="assets/Cole_Thomas_The_Course_of_Empire_The_Arcadian_or_Pastoral_State_1836.jpg" alt="Thomas Cole" />
		  <p>Congratulations my friend. You have enough money to retire in style. You will enjoy life with your fortune of {{player.duckets | number:'1.0-0'}} duckets, recouning your glory days.</p>
		  <input type="button" value="Play Again" routerLink="/new-game" />
		</div>
	`,
	providers: [ PlayerService ]
})

export class WinComponent {
  	players: Player[];
  	player: Player;
	constructor(
		private playerService: PlayerService
	) { }

	/* getPlayer(): void {
		this.player = this.playerService.getPlayer();
	} */

	ngOnInit(): void {
		this.players = this.playerService.getPlayers();
		this.player = this.players[0];
	}
}