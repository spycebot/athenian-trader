import { Injectable, OnInit } from '@angular/core';

import { Ship } from './ship';
import { SHIPS } from './mock-ships';

@Injectable()
export class ShipService {

	getShips(): Ship[] {
		return SHIPS;
	} 

	ngOnInit(): void {
		//console.log("ShipService:ngOnInit:SHIPS = " + SHIPS);
	}
}