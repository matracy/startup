function pollResult(name, numVotes) {
	return (
		<>
			<span>
				<p>{name} </p>
				<meter className="pollResults" value={numVotes} />
			</span>
		</>
	);
}

export { pollResult };
