import { Injectable } from '@angular/core';

import { webSocket, WebSocketSubject } from 'rxjs/webSocket';


@Injectable({
	providedIn : 'root'
})
export class WebsocketService {

	open<T> (url : string) : WebSocketSubject<T> {
		return webSocket({
			url,
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
