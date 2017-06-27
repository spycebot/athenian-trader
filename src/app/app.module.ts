import { BrowserModule }			from '@angular/platform-browser';
import { NgModule }					from '@angular/core';
import { FormsModule }				from '@angular/forms';
import { RouterModule, Routes }		from '@angular/router';

//import { AppRoutingModule }		from './app-routing.module';
import { AppComponent } 			from './app.component';
/*
import { PlayerDetailComponent }  from './player-detail.component'
import { ShipDetailComponent }    from './ship-detail.component';
import { PortDetailComponent }    from './port-detail.component';
import { HomeComponent }          from './home.component';
*/
import { HowToComponent }     from './how-to.component';

import { PlayerService }          	from './player.service';
import { PortService }          	from './port.service';
import { ShipService }				from './ship.service';

@NgModule({
  declarations: [
    AppComponent,
    HowToComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ 
  	PlayerService, 
  	PortService,
  	ShipService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
