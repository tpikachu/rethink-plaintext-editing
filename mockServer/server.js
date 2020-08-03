const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const fetch = require("node-fetch");

const ShortURL = require("./models/shortUrl");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let mockData = [];

const doFetch = async () => {
	const response = await fetch("https://randomuser.me/api/?results=2000");
	const body = await response.json();
	const contacts = body.results;
	mockData = contacts;
};

// Mock Data Initialize for Q2
doFetch();

mongoose.connect("mongodb://localhost:27017/urlShortener", {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// Genereate the shortUrl based on Original Url
// Save this to database
app.post("/shortUrl", async (req, res) => {
	const shortUrl = await ShortURL.create({ originalUrl: req.body.url });
	res.send(shortUrl);
});

// Get the shortUrl from the params
// Find the original one and redirect this to original Url
app.get("/:shortUrl", async (req, res) => {
	const shortUrl = await ShortURL.findOne({ shortUrl: req.params.shortUrl });

	if (!shortUrl) {
		return res.sendStatus(404);
	}

	return res.redirect(shortUrl.originalUrl);
});

// Search API
app.get("/api/getData", (req, res) => {
	const { filter, from, len } = req.query;

	const filteredData = mockData.filter(
		(data) =>
			data.name.first.toLowerCase().includes(filter.toLowerCase()) ||
			data.name.last.toLowerCase().includes(filter.toLowerCase())
	);

	return res.send({
		data: filteredData.slice(parseInt(from), parseInt(from) + parseInt(len)),
		totalLen: filteredData.length
	});
});

// Redirect this to frontend page
app.get("/", (req, res) => {
	return res.redirect("http://localhost:3000");
});

app.listen(process.env.PORT || 5000);
