module.exports = function(mongoose, Checkout, Movie) {
	// What is the title of the movie(s) that was the most checked out?
	Checkout.aggregate(
		{$group: {
				_id: "$movieId",
				count: {$sum: 1}
			}
		},
		(err, data) => {
			var max = 0;
			var ids = [];
			var titles = [];
			for (var d in data) {
				if(data[d].count > max) {
					max = data[d].count;
				}
			}
			for (var d in data) {
				if(data[d].count === max) {
					ids.push(data[d]._id);
				}
			}
			Movie.find({_id: {$in: ids}}, "title", (err, data) => {
				for (var d in data) {
					titles.push(data[d].title);
				}
				console.log("Most checked out movies are: " + titles);
			});
		}
	);
};
