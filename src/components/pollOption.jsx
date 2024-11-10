function pollOption({ name, rank, increaseRank, decreaseRank }) {
	return (
		<>
			<div className="pollOption">
				<span>
					{name}
					{{ rank } != null
						? ": " +
							{ rank } +
							'\
					<p className="imitationButton" onClick={increaseRank({name})}>\
						+\
					</p>\
					<p clasName="imitationButton" onClick={decreaseRank({name})}>\
						-\
					</p>\
					'
						: null}
				</span>
			</div>
		</>
	);
}

export { pollOption };
