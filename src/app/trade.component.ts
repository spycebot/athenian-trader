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
			<h3>The Port of {{ports[1].name}}</h3>
			<p>In {{ports[1].name}}  you can buy and sell commodities for these prices.</p>
			<table>
				<tr><th>Commodity</th><th>Stock</th><th>Buy</th><th>Sell</th>
				<tr *ngFor="let commodity of commodities; let i = index">
					<td>{{commodity}}</td>
					<td>{{ports[1].stock[i]}}</td>
					<td><input type="button" (click)="buy(commodity, i, ports[1].buyPrice[i])" value="{{ports[1].buyPrice[i]}}" /></td>
					<td><input type="button" (click)="sell(commodity, i, ports[1].sellPrice[i])" value="{{ports[1].sellPrice[i]}}" /></td>
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
	}

	goBack(): void {
	  this.location.back();
	}



	buy(com: string, i: number, price: number): void {
		if (this.players[0].duckets >= price && this.ships[1].available > 0 && this.ports[1].stock[i] > 0) { 
			this.players[0].duckets = +this.players[0].duckets - price; 
			this.ships[1].cargo[i] = +this.ships[1].cargo[i] + 1;
			this.ships[1].available = +this.ships[1].available - 1;
			this.ports[1].stock[i] = +this.ports[1].stock[i] - 1;
			console.log(com + " sold! at position " + i + " for a price of " + price);
		} else { console.log("Unable to buy " + i); }
	}

	sell(com: string, i: number, price: number): void {
		if (this.ships[1].cargo[i] > 0) { 
			this.players[0].duckets = +this.players[0].duckets + price; 
			this.ships[1].cargo[i] = +this.ships[1].cargo[i] - 1;
			this.ships[1].available = +this.ships[1].available + 1;
			this.ports[1].stock[i] = +this.ports[1].stock[i] + 1
			console.log(com + " sold! but for less money, at position " + i);
		} else { console.log("Unable to sell " + i); }
	}
}