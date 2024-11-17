import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../main";

function isSignedIn() {
	const user = useContext(GlobalState).user;
	if (user == null || user == undefined) {
		return false;
	}
	return Object.keys(user).length > 0;
}

function Header() {
	const username = useContext(GlobalState).name;
	if (isSignedIn()) {
		return (
			<>
				<header>
					<div className="homeButton">
						<Link to="/index.html">
							<img className="imgLink" src="./logo-wide.svg" alt="STV Online" />
						</Link>
					</div>
					<div className="accountHeading">
						<Link to="/account.html">
							<img
								className="imgLink"
								src="./generic-pfp.svg"
								alt="pfp"
								width="50px"
							/>
						</Link>
						<p className="infoText">Voting as {username}</p>
					</div>
					<div>
						<Link className="navLink" to="/logout.html">
							Log out
						</Link>
					</div>
				</header>
			</>
		);
	} else {
		return (
			<>
				<header>
					<nav className="homepageAccountLinks">
						<div className="navLink">
							<Link to="/createAccount.html">Register</Link>
						</div>
						<div className="navLink">
							<Link to="/signIn.html">Login</Link>
						</div>
					</nav>
				</header>
			</>
		);
	}
}
export { Header };
