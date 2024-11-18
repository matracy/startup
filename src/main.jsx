import { createContext } from "react";
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
import { fetchPolls, signOut } from "./backendInterface.js";
import { Logout } from "./pages/logout.jsx";
import { CodeFloat } from "./components/codeFloat.jsx";

const root = createRoot(document.getElementById("root"));
export const GlobalState = createContext({
	name: null,
	pollID: null,
	authToken: null,
	registrationNumber: null,
});

function setName(name) {
	GlobalState.name = name;
}

function setAuthToken(token) {
	GlobalState.authToken = token;
}

function setPoll(pollID) {
	GlobalState.pollID = pollID;
}

function setRegistration(num) {
	GlobalState.registrationNumber = num;
}

function AppWrapper() {
	const navigateTo = useNavigate();

	return (
		<>
			<GlobalState.Provider value={GlobalState}>
				<Header />
				<CodeFloat />
				<main>
					<Routes>
						<Route path="/" element={<Landing />} exact />
						<Route
							path="/account.html"
							element={
								<Account
									polls={() => {
										if (!GlobalState.authToken) {
											return [];
										} else {
											return fetchPolls(GlobalState.authToken);
										}
									}}
								/>
							}
						/>
						<Route
							path="/createAccount.html"
							element={
								<CreateAccount
									notifyStateOfNewUser={(name, authToken) => {
										setName(name);
										setAuthToken(authToken);
										navigateTo("/account.html");
									}}
								/>
							}
						/>
						<Route
							path="/createPoll.html"
							element={
								<CreatePoll
									redirecter={(pollID, registrationNumber) => {
										setPoll(pollID);
										setRegistration(registrationNumber);
										navigateTo("/registerInPoll.html");
									}}
									authToken={GlobalState.authToken}
								/>
							}
						/>
						<Route
							path="/poll.html"
							element={
								<Poll
									poll={GlobalState.pollID}
									redirecter={() => {
										navigateTo("/pollResults.html");
									}}
									authToken={GlobalState.authToken}
								/>
							}
						/>
						<Route
							path="/pollResults.html"
							element={<PollResults poll={GlobalState.pollID} />}
						/>
						<Route
							path="/registerInPoll.html"
							element={
								<RegisterInPoll
									poll={GlobalState.pollID}
									redirecter={(pollID) => {
										setPoll(pollID);
										navigateTo("/poll.html");
									}}
									authToken={GlobalState.authToken}
								/>
							}
						/>
						<Route
							path="/signIn.html"
							element={
								<SignIn
									notifyStateOfNewUser={(name, authToken) => {
										setName(name);
										setAuthToken(authToken);
										navigateTo("/account.html");
									}}
								/>
							}
						/>
						<Route
							path="/logout.html"
							element={
								<Logout
									redirecter={() => {
										signOut(GlobalState.authToken);
										setUser(null);
										setAuthToken(null);
										navigateTo("/");
									}}
								/>
							}
							exact
						/>
						<Route path="*" element={<Navigate to="/" replace />} />
					</Routes>
				</main>
				<Footer />
			</GlobalState.Provider>
		</>
	);
}

root.render(
	<BrowserRouter>
		<AppWrapper />
	</BrowserRouter>,
);
