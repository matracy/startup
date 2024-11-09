function pollResult({ name, numVotes }) {
	return (
		<>
			<span>
				<p>{name} </p>
				<meter class="pollResults" value={numVotes} />
			</span>
		</>
	);
}

export { pollResult };
