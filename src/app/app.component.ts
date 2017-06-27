import { Component, OnInit }	from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';

import { COMMODITIES }			from './commodities';

import { Player }				from './player';
import { Ship }					from './ship';
import { Port }					from './port';
import { PlayerService }		from './player.service';
import { ShipService }			from './ship.service';
import { PortService }			from './port.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  commodities = COMMODITIES;
  players: Player[];
  ports: Port[];
  ships: Ship[];
  destination: number = 0;
  shipIndex: number = 1;
  portIndex: number = 1;
  constructor(
  	private playerService: PlayerService,
  	private shipService: ShipService,
  	private portService: PortService
  ) { }


  ngOnInit(): void {
    this.getPlayers();
    this.getShips();
    this.getPorts();
    //console.log(players[0].destination);
  }

  getPlayers(): void {
    this.players = this.playerService.getPlayers();
  }

  getShips(): void {
    this.ships = this.shipService.getShips();
  }

  getPorts(): void {
    this.ports = this.portService.getPorts();
  }
}
