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

	sendMessage (repeat : number = 1) : void {
		console.log('sendMessage()');

		const ws$ : WebSocketSubject<Message> = this.wsSvc.open<Message>('ws://localhost:3001');

		const sub : Subscription = ws$.pipe(
			tap((msg) => {
				console.log('tap()', msg);
			})
		)
		.subscribe();


		for (let i = 0; i < repeat; i++) {
			ws$.next({
				message : new Date().toISOString()
			});
		}


		setTimeout(() => {
			console.log('close');

			ws$.complete();
		}, 50);
	}

}
