import { Injectable, OnInit } from '@angular/core';

import { Port } from './port';
import { PORTS } from './ports-list';

@Injectable()
export class PortService {

	getPorts(): Port[] {
		return PORTS;
	} 

	ngOnInit(): void {
		console.log("PortService:ngOnInit:PORTS = " + PORTS);
	}
}