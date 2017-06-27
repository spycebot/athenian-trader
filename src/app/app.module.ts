import { BrowserModule }			from '@angular/platform-browser';
import { NgModule }					from '@angular/core';
import { FormsModule }				from '@angular/forms';
import { RouterModule, Routes }		from '@angular/router';
import { AppComponent } 			from './app.component';
/*
import { PlayerDetailComponent }  from './player-detail.component'
import { ShipDetailComponent }    from './ship-detail.component';
import { PortDetailComponent }    from './port-detail.component';
import { HomeComponent }          from './home.component';
*/
import { SplashComponent }     from './splash.component';
import { HowToComponent }     from './how-to.component';
import { NewGameComponent }     from './new-game.component';

import { PlayerService }          	from './player.service';
import { PortService }          	from './port.service';
import { ShipService }				from './ship.service';

import { AppRoutingModule }		from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HowToComponent,
    SplashComponent,
    NewGameComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [ 
  	PlayerService, 
  	PortService,
  	ShipService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
