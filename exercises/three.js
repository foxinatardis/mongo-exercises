module.exports = function(mongoose, Checkout, Movie) {
	// What is the title of the movie(s) that was the most checked out?
	Checkout.aggregate(
		{$group: {
				_id: "$movieId",
				count: {$sum: 1}
			}
		}
	).sort("-count").exec((err, data) => {
		var most = [];
		var titles = [];
		for (var d in data) {
			if(data[d].count === data[0].count) {
				most.push(data[d]._id);
			} else {
				break;
			}
		}
		Movie.find({_id: {$in: most}}, {"title": 1}).exec( (err, data) => {
			for (var d in data) {
				titles.push(data[d].title);
			}
			console.log("Most checked out movies are: " + titles);
		});
	});
};
