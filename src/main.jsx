import { useState, createContext, useContext } from "react";
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
import { Logout } from "./pages/logout.jsx";

const root = createRoot(document.getElementById("root"));
export const GlobalState = createContext({ user: {}, poll: {} });
const user = GlobalState.user;

function setUser(usr) {
	GlobalState.user = usr;
}

function AppWrapper() {
	const navigateTo = useNavigate();

	return (
		<>
			<GlobalState.Provider value={GlobalState}>
				<Header />
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
									poll="some-hardcoded-poll"
									redirecter={() => {
										navigateTo("/pollResults.html");
									}}
								/>
							}
						/>
						<Route
							path="/pollResults.html"
							element={<PollResults poll={{ result: "Option 1" }} />}
						/>
						<Route
							path="/registerInPoll.html"
							element={
								<RegisterInPoll
									poll="some-hardcoded-poll"
									redirecter={() => {
										navigateTo("/poll.html");
									}}
								/>
							}
						/>
						<Route
							path="/signIn.html"
							element={
								<SignIn
									notifyStateOfNewUser={(usr) => {
										setUser(usr);
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
										setUser({});
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
