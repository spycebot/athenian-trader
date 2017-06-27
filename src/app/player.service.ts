import { Injectable, OnInit } from '@angular/core';

import { Player } from './player';
import { PLAYERS } from './mock-players';

@Injectable()
export class PlayerService {

	getPlayers(): Player[] {
		return PLAYERS;
	} 

	getPlayer(): Player {
		return PLAYERS[0];
	}

	ngOnInit(): void {
		console.log("PlayerService:ngOnInit:PLAYER = " + PLAYERS);
	}
}