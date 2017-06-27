import { Component, OnInit } 		from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';
import { Location }					from '@angular/common';
import { Player } 					from './player';
import { PlayerService }			from './player.service';

@Component({
	selector: 'how-to',
	template: `
	
		<div>
		  <h2>How To Play</h2>
		  <p>The goal is simple, make a lot of money. In your case, we'll start off easy and say one million duckets would make and <em>okay</em> retirement. How we make money even simpler: buy low and sell high. It's not trigonometry! However, its not all that you'd think. Luck plays a part, and life on the open water -- how shall we say? -- has it's <em>ups</em>, and <em>downs!</em></p>
		  <p>You begin the game in your home port of Athens, with {{players[0].duckets}} duckets in cash, a small ship, and a load of wheat. Sail from port to port, buying commodities where they are cheap and selling them where they are expensive.</p>
		  <input type="button" value="Next" routerLink="/new-game" />
		</div>
	`,
	providers: [ PlayerService ]
})

export class HowToComponent {
	//@Input() player: Player;
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