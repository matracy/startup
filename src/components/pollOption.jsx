function pollOption(name, rank, increaseRank, decreaseRank) {
	if (rank == null) {
		return (
			<>
				<div className="pollOption">
					<span>{name}</span>
				</div>
			</>
		);
	} else {
		return (
			<>
				{rank}
				<p className="imitationButton" onClick={increaseRank(name)}>
					+
				</p>
				<p clasName="imitationButton" onClick={decreaseRank(name)}>
					-
				</p>
			</>
		);
	}
}

export { pollOption };
