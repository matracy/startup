function logHTTPRequestResponse(req, res, next) {
	//simple bookkeeping
	const endpoint = req.url;
	const method = req.method;
	const reqBodyHolder = JSON.stringify(req.body);
	const reqHeadersHolder = JSON.stringify(req.headers);
	const timestamp = Date.now();

	console.log(`[${timestamp}] [${method} ${endpoint}]`);

	//Prepare for some arcane espionage as guided by https://stackoverflow.com/questions/57551635/how-to-get-response-body-in-middleware
	//The basic idea is that res.json() is part of the response chain, so if we overload it with our own lambda, we can run after the
	//response has been decided, thus allowing us to capture it for logging despire the middleware having already finished execution.

	function injectableLogger(bodyToSend) {
		const logMessage = `[${timestamp}] [${method} ${endpoint}]: Status ${res.statusCode}\nRequest:\nH:\t${reqHeadersHolder}\nB:\t${reqBodyHolder}\nResponse: ${JSON.stringify(bodyToSend)}`;
		console.log(logMessage);
	}

	// const oldSend = res.send;
	const oldSend = res.send.bind(res);
	res.send = (bodyToSend) => {
		injectableLogger(bodyToSend);
		return oldSend.call(res, bodyToSend);
	};

	//Now that we have injected logging to the request, let everyone else have a turn with it.
	next();
}

export { logHTTPRequestResponse };
