import { useState } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import { account } from "./pages/account.jsx";
import { createAccount } from "./pages/createAccount.jsx";
import { createPoll } from "./pages/createPoll.jsx";
import { landing } from "./pages/landing.jsx";
import { poll } from "./pages/poll.jsx";
import { pollResults } from "./pages/pollResults.jsx";
import { registerInPoll } from "./pages/registerInPoll.jsx";
import { signIn } from "./pages/signIn.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		<div className="app">
			<main>
				<Routes>
					<Route path="/" element={<landing />} exact />
					<Route path="/account" element={<account />} />
					<Route path="/createAccount" element={<createAccount />} />
					<Route path="/newPoll" element={<newPoll />} />
					<Route path="/poll" element={<poll />} />
					<Route path="/pollResults" element={<pollResults />} />
					<Route path="/registerInPoll" element={<registerInPoll />} />
					<Route path="/signIn" element={<signIn />} />
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</main>
		</div>
	</BrowserRouter>,
);
