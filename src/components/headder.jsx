function Header({ isSignedIn, name }) {
	if (isSignedIn) {
		return (
			<>
				<header>
					<div className="homeButton">
						<a href="./index.html">
							<img className="imgLink" src="./logo-wide.svg" alt="STV Online" />
						</a>
					</div>
					<div className="accountHeading">
						<a href="./account.html">
							<img
								className="imgLink"
								src="./generic-pfp.svg"
								alt="pfp"
								width="50px"
							/>
						</a>
						<p className="infoText">Voting as {name}</p>
					</div>
					<div>
						<a className="navLink" href="./index.html">
							Log out
						</a>
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
							<a href="./createAccount.html">Register</a>
						</div>
						<div className="navLink">
							<a href="./signIn.html">Login</a>
						</div>
					</nav>
				</header>
			</>
		);
	}
}
export { Header };
