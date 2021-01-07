import { Component } from '@angular/core';

import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { WebSocketSubject } from 'rxjs/webSocket';

import { WebsocketService } from 'src/app/services';
import { Message } from '../../../common/interfaces';


@Component({
	selector : 'app-root',
	templateUrl : './app.component.html',
	styleUrls : ['./app.component.styl']
})
export class AppComponent {

	constructor (private wsSvc : WebsocketService) {
	}

	send1Message () : void {
		console.log('send1Message()');

		const ws$ : WebSocketSubject<Message> = this.wsSvc.open<Message>('ws://localhost:3001');

		const sub : Subscription = ws$.pipe(
			tap((msg) => {
				console.log('tap()', msg);
			})
		)
		.subscribe();

		ws$.next({
			message : new Date().toISOString()
		});

		setTimeout(() => {
			console.log('close');

			ws$.complete();
		}, 50);
	}

}
