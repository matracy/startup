import { useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
root.render(
	<BrowserRouter>
		<Header />
		<main>
			<Routes>
				<Route path="/" element={<Landing />} exact />
				<Route path="/account" element={<Account />} />
				<Route path="/createAccount" element={<CreateAccount />} />
				<Route path="/createPoll" element={<CreatePoll />} />
				<Route path="/poll" element={<Poll />} />
				<Route path="/pollResults" element={<PollResults />} />
				<Route path="/registerInPoll" element={<RegisterInPoll />} />
				<Route path="/signIn" element={<SignIn />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</main>
		<Footer />
	</BrowserRouter>,
);
