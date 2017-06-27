import { NgModule } 			from '@angular/core';
import { RouterModule, Routes }	from '@angular/router';


import { HowToComponent }	from './how-to.component';
import { SplashComponent }	from './splash.component';
import { NewGameComponent }	from './new-game.component';
/*
import { DashboardComponent }	from './dashboard.component';
import { HeroesComponent }		from './heroes.component';
import { HeroDetailComponent }	from './hero-detail.component';
*/

const routes: Routes = [
	{ path: '', redirectTo: 'splash', pathMatch: 'full' },
	{ path: 'splash', component: SplashComponent },
	{ path: 'how-to', component: HowToComponent },
	{ path: 'new-game', component: NewGameComponent } /*,
	{ path: 'heroes', component: HeroesComponent } */
];

@NgModule({
	imports: [ RouterModule.forRoot(routes)],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}