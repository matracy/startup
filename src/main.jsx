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
import { fetchPolls } from "./backendInterface.js";

const root = createRoot(document.getElementById("root"));

function AppWrapper() {
	const [user, setUser] = useState({});
	const navigateTo = useNavigate();

	function isSignedIn() {
		if (user == null) {
			return false;
		}
		return Object.keys(user).length > 0;
	}
	return (
		<>
			<Header isSignedIn={isSignedIn()} name={user.name} />
			<main>
				<Routes>
					<Route path="/" element={<Landing />} exact />
					<Route
						path="/account.html"
						element={<Account polls={fetchPolls(user)} />}
					/>
					<Route
						path="/createAccount.html"
						element={
							<CreateAccount
								notifyStateOfNewUser={(usr) => {
									setUser(usr);
									navigateTo("/account.html");
								}}
							/>
						}
					/>
					<Route
						path="/createPoll.html"
						element={
							<CreatePoll
								redirecter={() => {
									navigateTo("/registerInPoll.html");
								}}
							/>
						}
					/>
					<Route
						path="/poll.html"
						element={
							<Poll
								redirecter={() => {
									navigateTo("/pollResults.html");
								}}
							/>
						}
					/>
					<Route path="/pollResults.html" element={<PollResults />} />
					<Route
						path="/registerInPoll.html"
						element={
							<RegisterInPoll
								redirecter={() => {
									navigateTo("/poll.html");
								}}
							/>
						}
					/>
					<Route
						path="/signIn.html"
						element={<SignIn notifyStateOfNewUser={setUser} />}
					/>
					<Route
						path="/logout.html"
						element={() => {
							{
								setUser({});
							}
							<Landing />;
						}}
						exact
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
