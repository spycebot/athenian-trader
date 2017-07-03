import { BrowserModule }			from '@angular/platform-browser';
import { NgModule }					from '@angular/core';
import { FormsModule }				from '@angular/forms';
import { RouterModule, Routes }		from '@angular/router';
import { AppComponent } 			from './app.component';

import { SplashComponent }     		from './splash.component';
import { HowToComponent }    		from './how-to.component';
import { NewGameComponent }     	from './new-game.component';
import { WinComponent }     		from './win.component';
import { LoseComponent }     		from './lose.component';
import { PortComponent }     		from './port.component';
import { TradeComponent }     		from './trade.component';
import { ShipDetailComponent }     	from './ship-detail.component';
import { PlayerDetailComponent }    from './player-detail.component';
import { SetSailComponent }     	from './set-sail.component';
import { AtSeaComponent }         from './at-sea.component';
import { MarketsComponent }         from './markets.component';
import { WarehouseComponent }         from './warehouse.component';

import { PlayerService }          	from './player.service';
import { PortService }          	from './port.service';
import { ShipService }				from './ship.service';

import { AppRoutingModule }		from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HowToComponent,
    SplashComponent,
    NewGameComponent,
    WinComponent,
    LoseComponent,
    PortComponent,
    TradeComponent,
    ShipDetailComponent,
    PlayerDetailComponent,
    SetSailComponent,
    AtSeaComponent,
    MarketsComponent,
    WarehouseComponent
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
