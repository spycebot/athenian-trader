import { Component, OnInit } 		from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';
import { Location }					from '@angular/common';
import { Player } 					from './player';
import { Port } 					from './port';
import { PlayerService }			from './player.service';
import { PortService }				from './port.service';

@Component({
	selector: 'money-lender',
	//styles: [`
	//		ship-detail { float: left; }
	//		table input { width: 100%; }
	//	`],
	template: `
		<div>
			<h2>Money Lender in {{port.name}}</h2>
			<p>The money lender can help in a pinch.</p>
			<h3>Borrow</h3>
			<p>What happens when you borrow a negative amount of money? Is it exactly the same as lending, which is over-paying?</p>
			<input type="button" value="{{maxBorrow() / 4 | number:'1.0-0'}}" (click)="borrow(maxBorrow() / 4)" />
			<input type="button" value="{{maxBorrow() / 2 | number:'1.0-0'}}" (click)="borrow(maxBorrow() / 2)" />
			<input type="button" value="{{maxBorrow() * 3 / 4 | number:'1.0-0'}}" (click)="borrow(maxBorrow() * 3 / 4)" />
			<input type="button" value="{{maxBorrow()}}" (click)="borrow(maxBorrow())" />
			<h3>Repay</h3>
			<input type="button" value="{{player.duckets / 4 | number:'1.0-0'}}" (click)="repay(player.duckets / 4)" />
			<input type="button" value="{{player.duckets / 2 | number:'1.0-0'}}" (click)="repay(player.duckets / 2)" />
			<input type="button" value="{{player.duckets * 0.75 | number:'1.0-0'}}" (click)="repay(player.duckets * 0.75)" />
			<input type="button" value="{{player.duckets | number:'1.0-0'}}" (click)="repay(player.duckets)" />
			<player-detail></player-detail>

			
			<input type="button" value="Back" (click)="goBack()" />
		</div>
	`,
	providers: [ PlayerService ]
})

export class MoneyLenderComponent implements OnInit {
  	players: Player[];
  	//ships: Ship[];
  	ports: Port[];
  	player: Player;
  	//ship: Ship;
  	port: Port;
  	//ommodities = COMMODITIES;
	constructor(
		private playerService: PlayerService,
		//private shipService: ShipService,
		private portService: PortService,
		private route: ActivatedRoute,
		private location: Location
	) { }

	ngOnInit(): void {
		this.players = this.playerService.getPlayers();
		//this.ships = this.shipService.getShips();
		this.ports = this.portService.getPorts();
		this.player = this.players[0];
		//this.ship = this.ships[this.player.ship];
		this.port = this.ports[this.player.currentPort];
		if (!this.player.debt) this.player.debt = 0;
		//console.log("MoneyLenderComponent:ngOnInit:port.name: " + this.port.name);
	}

	goBack(): void {
	  this.location.back();
	}

	maxBorrow(): number {
		let mb = Math.floor((this.player.duckets - (this.player.debt * 1.5)) * 3) ;
		if (mb < 0 ) { mb = 0; }
		return mb;
	}

	borrow(n): void {
		n = Math.round(n);
		this.player.debt = this.player.debt + n;
		this.player.duckets = this.player.duckets + n;
	}

	repay(n): void {
		n = Math.round(n);
		this.player.debt = this.player.debt - n;
		this.player.duckets = this.player.duckets - n; 
		console.log("MoneyLenderComponent:repay:n: " + n);
	}
}