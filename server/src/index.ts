import * as ws from 'ws';

import { Message } from '../../common/interfaces';

console.log('server start');


const wss = new ws.Server({
	port : 3001
});


wss.on('connection', (ws) => {
	console.log('\nws connection');

	function send (msg : Message) : void {
		ws.send(JSON.stringify(msg));
	}

	ws.on('open', () => {
		send({
			message : 'connected'
		});
	});

	ws.on('message', (msg) => {
		console.log(`ws message [${ typeof msg }] :`, msg);

		send({
			message : new Date().toISOString()
		});
	});

	ws.on('close', () => {
		console.log('ws close\n');
	});
});
