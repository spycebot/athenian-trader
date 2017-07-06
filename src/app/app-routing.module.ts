import { NgModule } 			from '@angular/core';
import { RouterModule, Routes }	from '@angular/router';


import { HowToComponent }		from './how-to.component';
import { SplashComponent }		from './splash.component';
import { NewGameComponent }		from './new-game.component';
import { WinComponent }			from './win.component';
import { LoseComponent }		from './lose.component';
import { PortComponent }		from './port.component';
import { TradeComponent }		from './trade.component';
import { SetSailComponent }		from './set-sail.component';
import { AtSeaComponent }   	from './at-sea.component';
import { MarketsComponent }   	from './markets.component';
import { WarehouseComponent }   from './warehouse.component';
import { MoneyLenderComponent }	from './money-lender.component';

const routes: Routes = [
	{ path: '', redirectTo: '/splash', pathMatch: 'full' },
	{ path: 'splash', component: SplashComponent },
	{ path: 'how-to', component: HowToComponent },
	{ path: 'new-game', component: NewGameComponent },
	{ path: 'win', component: WinComponent },
	{ path: 'lose', component: LoseComponent },
	{ path: 'port', component: PortComponent },
	{ path: 'port/trade', component: TradeComponent },
	{ path: 'port/set-sail', component: SetSailComponent },
	{ path: 'port/warehouse', component: WarehouseComponent },
	{ path: 'port/money-lender', component: MoneyLenderComponent },
	{ path: 'at-sea', component: AtSeaComponent },
	{ path: 'markets', component: MarketsComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes)],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}