module.exports = function(mongoose, Checkout, Movie) {
	// Which users checked out any of the Lord of the Rings trilogy?
	Movie.find({title: /The Lord of the Rings:/}, (err, data) => {
		var ids = [];
		for(var d in data) {
			ids.push(data[d]._id);
		}
		Checkout.find(
			{
				$or: [{movieId: ids[0]},
				{movieId: ids[1]},
				{movieId: ids[2]}]
			},
			(err, data) => {
				var users = [];
				for(var d in data) {
					if (!users.includes(data[d].userId)) {
						users.push(data[d].userId);
					}
				}
				users.sort(function(a,b) {return a - b;});
				console.log("Users who checked out Lord of the Rings movies: " + users);
			}
		);
	});
};
