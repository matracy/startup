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
				<div className="pollOption">
					<span>
						{name}: {rank}
						<p className="imitationButton" onClick={() => increaseRank(name)}>
							+
						</p>
						<p className="imitationButton" onClick={() => decreaseRank(name)}>
							-
						</p>
					</span>
				</div>
			</>
		);
	}
}

export { pollOption };
