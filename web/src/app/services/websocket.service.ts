import { Injectable } from '@angular/core';

import { webSocket, WebSocketSubject } from 'rxjs/webSocket';


@Injectable({
	providedIn : 'root'
})
export class WebsocketService {

	// url: without protocol
	open<T> (url : string) : WebSocketSubject<T> {
		return webSocket({
			url : window.location.protocol === 'http:'
				? 'ws://' + url
				: 'wss://' + url,
			deserializer : (event : MessageEvent<string>) : T => {
				let data : T;

				try {
					data = JSON.parse(event.data);
				}
				catch (e) {
					data = event.data as unknown as T;
				}

				return data;
			}
		});
	}

}
