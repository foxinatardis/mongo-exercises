module.exports = function(mongoose, Checkout, Movie) {
	//Users who checked out any of the Lord of the Rings trilogy
	Movie.find({title: /The Lord of the Rings:/}).exec((err, data)=>{
		Checkout.find(
			{
				$or: [{movieId: data[0]._id},
				{movieId: data[1]._id},
				{movieId: data[2]._id}]
			}
		).distinct("userId").exec((err, data) => {
			data.sort(function(a, b) {return a - b;});
			console.log("Users who checked out Lord of the Rings: " + data);
		})
	});
};
