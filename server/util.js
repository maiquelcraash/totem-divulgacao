let util = () => {
	let dateToTimestamp = (date) => {
		let timestamp =
			date.getFullYear()
			+ "-" + (date.getMonth() + 1)
			+ "-" + date.getDate()
			+ " " + date.getHours()
			+ ":" + date.getMinutes()
			+ ":" + date.getSeconds();

		return timestamp;
	};

	let timestampToDate = (timestamp) => {
		let date = new Date(timestamp);
		return date;
	};

	return {
		dateToTimestamp: dateToTimestamp,
		timestampToDate: timestampToDate
	}

};

module.exports = util();