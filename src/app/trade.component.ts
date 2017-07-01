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
	selector: 'trade',
	styles: [`
			ship-detail { float: left; }
			input { width: 100%; }
		`],
	template: `
		<div>
			<h3>The Market of {{ports[+player.currentPort].name}}</h3>
			<p>In {{ports[+player.currentPort].name}}  you can buy and sell commodities for these prices.</p>
			<table>
				<tr><th>Commodity</th><!-- th>Stock</th --><th>Buy</th><th>Sell</th>
				<tr *ngFor="let commodity of commodities; let i = index">
					<td>{{commodity}}</td>
					<!-- td>{{ports[+player.currentPort].stock[i]}}</td -->
					<td><input type="button" (mousedown)="buy(commodity, i, ports[+player.currentPort].buyPrice[i])" value="{{ports[+player.currentPort].buyPrice[i] | number:'1.0-0'}}" /></td>
					<td><input type="button" (mousedown)="sell(commodity, i, ports[+player.currentPort].sellPrice[i])" value="{{ports[+player.currentPort].sellPrice[i] | number:'1.0-0'}}" /></td>
				</tr>
			</table>
			<ship-detail></ship-detail>
			<player-detail></player-detail>
			
			<input type="button" value="Back" (click)="goBack()" />
		</div>
	`,
	providers: [ PlayerService ]
})

export class TradeComponent {
  	players: Player[];
  	ships: Ship[];
  	ports: Port[];
  	player: Player;
  	ship: Ship;
  	port: Port;
  	commodities = COMMODITIES;
  	NUMERATOR: Number = 10000;
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
		this.ship = this.ships[this.player.ship];
		this.port = this.ports[this.player.currentPort];
	}

	goBack(): void {
	  this.location.back();
	}

	buy(com: string, i: number, price: number, event): void {
		price = Math.floor(price);
		if (this.player.duckets >= price && this.ship.available > 0 ) { // && this.ports[+this.player.currentPort].stock[i] > 0
			this.player.duckets = +this.player.duckets - price; 
			this.ship.cargo[i] = +this.ship.cargo[i] + 1;
			this.ship.available = +this.ship.available - 1;
			//this.ports[+this.player.currentPort].stock[i] = +this.ports[+this.player.currentPort].stock[i] - 1;
			//this.setPrice(i);
			console.log(com + " sold! at position " + i + " for a price of " + price);
		} else { console.log("Unable to buy " + i); }
	}

	sell(com: string, i: number, price: number): void {
		price = Math.floor(price);
		if (this.ship.cargo[i] > 0) { 
			this.player.duckets = +this.player.duckets + price; 
			this.ship.cargo[i] = +this.ship.cargo[i] - 1;
			this.ship.available = +this.ship.available + 1;
			//this.ports[+this.player.currentPort].stock[i] = +this.ports[+this.player.currentPort].stock[i] + 1;
			//this.setPrice(i);
			console.log(com + " sold! but for less money, at position " + i);
		} else { console.log("Unable to sell " + i); }
	}

	setPrice(i: number): void {
		if (this.port.stock[i] > 0) {
			// Price is based on stock, but a bit random
			let baseDifferential: number = 0.05;
			let randomDifferential: number = Math.random() / 10;
			this.port.buyPrice[i] = Math.floor(+this.NUMERATOR / ( 1 - (baseDifferential + randomDifferential)) / (+this.port.stock[i])); //0.833
			this.port.sellPrice[i] = Math.floor(+this.NUMERATOR / ( 1 + (baseDifferential + randomDifferential)) / (+this.port.stock[i]));} // 1.25
	}
}