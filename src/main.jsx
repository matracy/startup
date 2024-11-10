import { useState } from "react";
import { createRoot } from "react-dom/client";
import {
	BrowserRouter,
	Routes,
	Route,
	Navigate,
	useNavigate,
} from "react-router-dom";
import "./main.css";
import { Account } from "./pages/account.jsx";
import { CreateAccount } from "./pages/createAccount.jsx";
import { CreatePoll } from "./pages/createPoll.jsx";
import { Landing } from "./pages/landing.jsx";
import { Poll } from "./pages/poll.jsx";
import { PollResults } from "./pages/pollResults.jsx";
import { RegisterInPoll } from "./pages/registerInPoll.jsx";
import { SignIn } from "./pages/signIn.jsx";
import { Header } from "./components/headder.jsx";
import { Footer } from "./components/footer.jsx";

const root = createRoot(document.getElementById("root"));

function AppWrapper() {
	const [user, setUser] = useState({});
	const navigateTo = useNavigate();

	function isSignedIn() {
		console.log("User: " + user);
		if (user == null) {
			console.log("User was null.");
			return false;
		}
		console.log("User had key length " + Object.keys(user).length);
		return Object.keys(user).length > 0;
	}
	return (
		<>
			<Header isSignedIn={isSignedIn()} name={user.name} />
			<main>
				<Routes>
					<Route path="/" element={<Landing />} exact />
					<Route path="/account.html" element={<Account />} />
					<Route
						path="/createAccount.html"
						element={
							<CreateAccount
								notifyStateOfNewUser={(usr) => {
									setUser(usr);
									navigateTo("/");
								}}
							/>
						}
					/>
					<Route path="/createPoll.html" element={<CreatePoll />} />
					<Route path="/poll.html" element={<Poll />} />
					<Route path="/pollResults.html" element={<PollResults />} />
					<Route path="/registerInPoll.html" element={<RegisterInPoll />} />
					<Route
						path="/signIn.html"
						element={<SignIn notifyStateOfNewUser={setUser} />}
					/>
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</main>
			<Footer />
		</>
	);
}

root.render(
	<BrowserRouter>
		<AppWrapper />
	</BrowserRouter>,
);
