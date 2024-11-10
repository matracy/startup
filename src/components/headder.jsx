function Header({ isSignedIn, name }) {
	if ({ isSignedIn }) {
		return (
			<>
				<header>
					<div class="homeButton">
						<a href="./index.html">
							<img class="imgLink" src="./logo-wide.svg" alt="STV Online" />
						</a>
					</div>
					<div class="accountHeading">
						<a href="./account.html">
							<img
								class="imgLink"
								src="./generic-pfp.svg"
								alt="pfp"
								width="50px"
							/>
						</a>
						<p class="infoText">Voting as {name}</p>
					</div>
					<div>
						<a class="navLink" href="./index.html">
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
					<nav class="homepageAccountLinks">
						<div class="navLink">
							<a href="./createAccount.html">Register</a>
						</div>
						<div class="navLink">
							<a href="./signIn.html">Login</a>
						</div>
					</nav>
				</header>
			</>
		);
	}
}
export { Header };
