module.exports = function(mongoose, Checkout, Movie) {
	// What user(s) had the most checkouts?
	Checkout.aggregate({
		$group: {
			_id: "$userId",
			count: {$sum: 1}
		}
	}).sort({count: -1}).exec((err, data) => {
		for (var i in data) {
			if (data[i].count === data[0].count) {
				console.log("The User with the most checked out movies has id: " + data[i]._id);
			}
		}
	});
};
