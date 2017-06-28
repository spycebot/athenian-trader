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
		`],
	template: `
		<div>
			<h3>The Port of {{ports[+player.currentPort].name}}</h3>
			<p>In {{ports[+player.currentPort].name}}  you can buy and sell commodities for these prices.</p>
			<table>
				<tr><th>Commodity</th><th>Stock</th><th>Buy</th><th>Sell</th>
				<tr *ngFor="let commodity of commodities; let i = index">
					<td>{{commodity}}</td>
					<td>{{ports[+this.player.currentPort].stock[i]}}</td>
					<td><input type="button" (click)="buy(commodity, i, ports[+player.currentPort].buyPrice[i])" value="{{ports[+player.currentPort].buyPrice[i]}}" /></td>
					<td><input type="button" (click)="sell(commodity, i, ports[+player.currentPort].sellPrice[i])" value="{{ports[+player.currentPort].sellPrice[i]}}" /></td>
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
  	commodities = COMMODITIES;
  	player: Player;
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
	}

	goBack(): void {
	  this.location.back();
	}



	buy(com: string, i: number, price: number): void {
		if (this.player.duckets >= price && this.ships[+this.player.ship].available > 0 && this.ports[+this.player.currentPort].stock[i] > 0) { 
			this.player.duckets = +this.player.duckets - price; 
			this.ships[+this.player.ship].cargo[i] = +this.ships[+this.player.ship].cargo[i] + 1;
			this.ships[+this.player.ship].available = +this.ships[+this.player.ship].available - 1;
			this.ports[+this.player.currentPort].stock[i] = +this.ports[+this.player.currentPort].stock[i] - 1;
			console.log(com + " sold! at position " + i + " for a price of " + price);
		} else { console.log("Unable to buy " + i); }
	}

	sell(com: string, i: number, price: number): void {
		if (this.ships[+this.player.ship].cargo[i] > 0) { 
			this.player.duckets = +this.player.duckets + price; 
			this.ships[+this.player.ship].cargo[i] = +this.ships[+this.player.ship].cargo[i] - 1;
			this.ships[+this.player.ship].available = +this.ships[+this.player.ship].available + 1;
			this.ports[+this.player.currentPort].stock[i] = +this.ports[+this.player.currentPort].stock[i] + 1
			console.log(com + " sold! but for less money, at position " + i);
		} else { console.log("Unable to sell " + i); }
	}
}