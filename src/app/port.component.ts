import { Component, OnInit } 		from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';
import { Location }					from '@angular/common';
import { Player } 					from './player';
import { Ship } 					from './ship';
import { Port } 					from './port';
import { PlayerService }			from './player.service';
import { ShipService }				from './ship.service';
import { PortService }				from './port.service';

//import { COMMODITIES }				from './commodities';

@Component({
	selector: 'port',
	styles: [`
		img { width: 256px; }
	`],
	template: `
		<div>
			<h3>The Port of {{port.name}}</h3>
			<img src="assets/1024px-akropolis_by_leo_von_klenze1.jpg"  alt="Leo von Klenze" />
			<p>Welcome {{port.name}}. Visit the teaming market to trade!</p>
			<input type="button" value="Set Sail" routerLink="/port/set-sail" />
			<input type="button" value="Trade" routerLink="/port/trade" />
			<input type="button" value="Visit Warehouse" disabled />
			<input type="button" value="Borrow Money" disabled />
		</div>
	`,
	providers: [ PlayerService ]
})

export class PortComponent {
  	players: Player[];
  	ships: Ship[];
  	ports: Port[];
  	player: Player;
  	port: Port;
  	//commodities = COMMODITIES;

	constructor(
		private playerService: PlayerService,
		private shipService: ShipService,
		private portService: PortService
	) { }

	ngOnInit(): void {
		this.players = this.playerService.getPlayers();
		this.ships = this.shipService.getShips();
		this.ports = this.portService.getPorts();
		this.player = this.players[0];
		this.port = this.ports[this.player.currentPort];
		//console.log("PortComponent port.landscape: " + this.port.landscape);
		//this.modifyStock();
	}
}