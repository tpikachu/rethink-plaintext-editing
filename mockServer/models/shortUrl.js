const mongoose = require("mongoose");
const shortId = require("shortid");
const { Schema } = mongoose;

const shortUrlSchema = new Schema({
	originalUrl: {
		type: String,
		require: true
	},
	shortUrl: {
		type: String,
		require: true,
		default: shortId.generate
	}
});

module.exports = mongoose.model("ShortUrl", shortUrlSchema);
