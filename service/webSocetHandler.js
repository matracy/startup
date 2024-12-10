const { WebSocketServer } = require("ws");

function handleWebSocket(server) {
	const wss = new WebSocketServer({ backlog: 10, noServer: true });

	//listen for new websocket connections
	server.on("upgrade", (req, soc, head) => {
		wss.handleUpgrade(req, soc, head, (ws) => {
			wss.emit("connection", ws, req);
		});
	});

	//handle a new connection
	wss.on("connection", (ws) => {
		//register echo callback
		ws.on("message", (msg) => {
			ws.send(msg);
		});
	});
}

module.exports = { handleWebSocket };
