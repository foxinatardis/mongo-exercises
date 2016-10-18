module.exports = function(mongoose, Checkout, Movie) {
	// What user(s) had the most checkouts?
	
	Checkout.aggregate(
		{
			$group: {
				_id: "$userId",
				count: {$sum: 1}
			}
		},
	(err, data) => {
		var max = 0;
		var userId = [];
		for (var d in data) { //go through data to find the most checkouts
			if (data[d].count > max) {
				max = data[d].count;
			}
		}
		for (var d in data) { //go through data again to catch multiple users with the max checkouts
			if (data[d].count === max) {
				userId.push(data[d]._id);
			}
		}
		console.log("User with most movies checked out has id: " + userId);
	});

};
