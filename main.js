const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 4444;

let theData = JSON.parse(fs.readFileSync(`${__dirname}/data.json`));

app.use(cors());

// Middleware to add 2-second delay
app.use((req, res, next) => {
	setTimeout(next, 2000);
});

// Middleware to handle 50% chance of exception
app.use((req, res, next) => {
	if (Math.random() < 0.5) {
		throw new Error("Something went wrong");
	}
	next();
});

// Use express.json middleware to parse JSON bodies
app.use(express.json());

app.get("/get-data", async (req, res) => {
	try {
		res.json(theData);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

app.post("/store-data", (req, res) => {
	try {
		theData = req.body;
		res.status(200).json({ message: "Data stored successfully!" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Error handling middleware
app.use((err, req, res, next) => {
	res.status(500).send({ message: err.message });
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
