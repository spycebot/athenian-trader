import { Component, OnInit } 		from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';
import { Location }					from '@angular/common';
import { Player } 					from './player';
import { Ship } 					from './ship';
import { Port } 					from './port';
import { PlayerService }			from './player.service';
import { ShipService }				from './ship.service';
import { PortService }				from './port.service';

import { COMMODITIES } 				from './commodities';

@Component({
	selector: 'set-sail',
	styles: [`
			ship-detail { float: left; }
		`],
	template: `
		<div>
			<h3>The Port of {{port.name}}</h3>
			<p>To where shall we set sail, {{player.name}}?</p>
			<ul>
				<li *ngFor="let port of ports; let i = index">
					<input type="button" (click)="sailTo(i)" value="{{ports[i].name}}" routerLink="/at-sea" />
				</li>
			</ul>

			<input type="button" value="Back" (click)="goBack()" />
		</div>
	`,
	providers: [ PlayerService ]
})

export class SetSailComponent {
  	players: Player[];
  	ships: Ship[];
  	ports: Port[];
  	commodities = COMMODITIES;
  	player: Player;
  	port: Port;
	constructor(
		private playerService: PlayerService,
		private shipService: ShipService,
		private portService: PortService,
		private route: ActivatedRoute,
		private location: Location
	) { }

	/* getPlayer(): void {
		this.player = this.playerService.getPlayer();
	} */

	ngOnInit(): void {
		this.players = this.playerService.getPlayers();
		this.ships = this.shipService.getShips();
		this.ports = this.portService.getPorts();
		this.player = this.players[0];
		this.port = this.ports[this.player.currentPort];
	}

	goBack(): void {
	  this.location.back();
	}



	sailTo(i: number): void {
		this.player.destination = i;
	}
}