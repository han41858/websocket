import * as WebSocket from 'ws';

import { Message } from '../../common/interfaces';

console.log('server start');


const wss = new WebSocket.Server({
	port : 3001
});


wss.on('connection', (ws : WebSocket) => {
	console.log('\nws connection');

	function send (msg : Message) : void {
		ws.send(JSON.stringify(msg));
	}

	ws.onmessage = (event : WebSocket.MessageEvent) : void => {
		let data : Message;

		try {
			data = JSON.parse(event.data as string);
		}
		catch (e) {
			data = event.data as unknown as Message;
		}

		console.log(`ws message:`, {
			rawData : event.data,
			typeOfRawData : typeof event.data,

			data,
			typeOfData : typeof data
		});

		switch (data.mode) {
			case 'echo':
				send({
					mode : data.mode,
					message : new Date().toISOString()
				});
				break;

			case 'receive':
				setTimeout(() => {
					send({
						mode : data.mode,
						message : new Date().toISOString(),
						end : true
					});
				}, 1000);
				break;
		}
	};

	ws.onclose = (event : WebSocket.CloseEvent) : void => {
		console.log('ws close\n');
	};
});
