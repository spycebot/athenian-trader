import { Component, OnInit } 		from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';
import { Location }					from '@angular/common';
import { Player } 					from './player';
import { PlayerService }			from './player.service';

import { RANKINGS }			from './rankings';

@Component({
	selector: 'win',
	styles: [`
		table { color : grey; }
		.achieved { color : black; background-color: lightgrey }
	`],
	template: `
	
		<div>
		  <h2>You have won!</h2>
		  <img src="assets/Cole_Thomas_The_Course_of_Empire_The_Arcadian_or_Pastoral_State_1836.jpg" alt="Thomas Cole" />
		  <p>Congratulations my friend. You have enough money to retire in style. You will enjoy life with your fortune of {{player.duckets | number:'1.0-0'}} duckets, recouning your glory days.</p>
		  <input type="button" value="Play Again" routerLink="/new-game" />
		  <input type="button" value="Rankings" (click)="showRankings()" />
		  <p>Rank achieved: {{achieveLevel}}</p>
		  <div *ngIf="showRanking">
		  	<p>You will be remembered as a <em>{{restateHardness()}}</em> of the stature of <em>{{rankings[rank]}}</em>.</p>
		  	<table>
		  		<tr>
		  			<th>Target</th><th>Stature</th>
		  		</tr>
		  		<tr *ngFor="let figure of rankings; let i = index"  [class.achieved]="i == achieveLevel">
		  			<td>{{calcVictoryRank(i)}}</td>
		  			<td>{{figure}}</td>
		  		</tr>
		  	</table>
		  </div>
		</div>
	`,
	providers: [ PlayerService ]
})

export class WinComponent {
  	players: Player[];
  	player: Player;
  	rankings = RANKINGS;
  	rank: number;
  	showRanking: Boolean = false;
  	achieveLevel: number;
	constructor(
		private playerService: PlayerService
	) { }

	/* getPlayer(): void {
		this.player = this.playerService.getPlayer();
	} */

	ngOnInit(): void {
		this.players = this.playerService.getPlayers();
		this.player = this.players[0];
		this.achieveLevel = this.setAchieveLevel();
	}

	showRankings(): void {
		this.showRanking = true;
	}

	calcVictoryRank(i): number {
		let factor: number;
		let threshold: number;
		factor = 10 ** i;
		threshold = +this.player.victory * ( factor);
		console.log("WinComponent:calcVictoryRank:factor: " + factor + "; threshold: " + threshold)
		return threshold;
	}

	restateHardness(): string {
		let hardness: string;
		switch(this.player.victory) {
			case 10000: {
				hardness = 'apprentice';
				break;
			}
			case 100000: {
				hardness = 'journeyman';
				break;
			}
			case 1000000: {
				hardness = 'master';
				break;
			}
			default: {
				hardness = 'freelance';
				break;
			}
		}
		return hardness;
	}

	setAchieveLevel(): number {
		if (this.player.duckets > (this.player.victory * (10 ** 4))) {
			this.rank = 4;
			return 4;
		} else if (this.player.duckets > (this.player.victory * (10 ** 3))) {
			this.rank = 3;
			return 3;
		} else if (this.player.duckets > (this.player.victory * (10 ** 2))) {
			this.rank = 2;
			return 2;
		} else if (this.player.duckets > (this.player.victory * (10 ** 1))) {
			this.rank = 1;
			return 1;
		} 
		this.rank = 0;
		return 0;
	}
}