import * as ws from 'ws';

console.log('server start');


const wss = new ws.Server({
	port : 3001
});


wss.on('connection', (ws) => {
	console.log('\nws connection');

	ws.on('message', (msg) => {
		console.log(`ws message [${ typeof msg }] :`, msg);
	});

	ws.on('close', () => {
		console.log('ws close\n');
	});
});
