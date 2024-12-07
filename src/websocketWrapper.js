class WebsocketWrapper {
	constructor(msgHandler) {
		this.msgCallback = msgHandler;
		let port = window.location.port;
		const protocol = window.location.protocol === "http:" ? "ws" : "wss";
		this.socket = new WebSocket(
			`${protocol}://${window.location.hostname}:${port}/ws`,
		);
		this.socket.onopen = (event) => {
			//pass
		};
		this.socket.onclose = (event) => {
			//pass
		};
		this.socket.onmessage = async (msg) => {
			this.msgCallback(JSON.parse(await msg.data.text()));
		};
	}

	async send(msg) {
		this.socket.send(JSON.stringify(msg));
	}
}

export { WebsocketWrapper };
