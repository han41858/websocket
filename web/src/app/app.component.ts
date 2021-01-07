import { Component, OnInit } from '@angular/core';

import { tap } from 'rxjs/operators';
import { webSocket } from 'rxjs/webSocket';


@Component({
	selector : 'app-root',
	templateUrl : './app.component.html',
	styleUrls : ['./app.component.styl']
})
export class AppComponent implements OnInit {

	constructor () {
	}

	ngOnInit () : void {

	}

	send1Message () : void {
		console.log('sendMessage()');

		const subject = webSocket('ws://localhost:3001');

		subject.pipe(
			tap((msg) => {
				console.log('on message :', msg);
			})
		);

		subject.subscribe();


		subject.next({
			msg : 'hello'
		});

		subject.complete();
	}

}
