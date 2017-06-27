import { Component, OnInit } 		from '@angular/core';
import { ActivatedRoute, Params }	from '@angular/router';
import { Location }					from '@angular/common';

@Component({
	selector: 'splash',
	template: `
		<div style="text-align:center">
		  <h1>
		   {{title}}
		  </h1>
		<!-- object data="assets/atLogoMock.svg" type="image/svg+xml" -->
		  <img src="assets/atFallback.jpg" alt="Constantine Volanakis"/>
		<!-- /object -->
		  <p id="builtBy">Built by Shannon Ware in Ireland.</p>
		  <input type="button" value="Start" />
		  <input type="button" value="How To" routerLink="/how-to" />
		</div>
	`,
	providers: []
})

export class SplashComponent {
  title = 'Athenian Trader';
}