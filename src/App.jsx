import { useState } from "react";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<div>
				<a href="https://vite.dev" target="_blank">
					<img src="/logo-square.svg" className="logo" alt="STVOnline logo" />
				</a>
			</div>
			<h1>STV Online</h1>
			<div className="card">
				<button onClick={() => setCount((count) => count + 10)}>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.jsx</code> and save to test HMR
				</p>
			</div>
		</>
	);
}

export { App };
