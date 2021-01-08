import { Component } from '@angular/core';

import { Subscription } from 'rxjs';
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

	echo (repeat : number = 1) : void {
		console.group('echo');

		const ws$ : WebSocketSubject<Message> = this.wsSvc.open<Message>('localhost:3001');

		const sub : Subscription = ws$.subscribe({
			next (msg) : void {
				console.log('tap()', msg);
			},
			complete () : void {
				console.log('complete()');
				console.groupEnd();
			}
		});


		for (let i = 0; i < repeat; i++) {
			ws$.next({
				mode : 'echo',
				message : new Date().toISOString()
			});
		}


		setTimeout(() => {
			console.log('close');

			ws$.complete();
		}, 50);
	}

	endByFlag () : void {
		console.group('endByFlag()');

		const ws$ : WebSocketSubject<Message> = this.wsSvc.open<Message>('localhost:3001');

		const sub : Subscription = ws$.subscribe({
			next (msg) : void {
				console.log('next()', msg);

				if (msg.end) {
					ws$.complete();
				}
			},
			complete () : void {
				console.log('complete()');
				console.groupEnd();
			}
		});

		ws$.next({
			mode : 'receive',
			message : new Date().toISOString()
		});
	}

}
