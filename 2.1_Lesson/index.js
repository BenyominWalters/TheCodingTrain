const express = require('express');
const Datastore = require('nedb');
const app = express();
const port = 3000;
const fs = require('fs');

app.listen(port, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
database.loadDatabase();

app.post('/api', (request, response) => {
	// console.log('I got a request');
	// console.log(request.body);

	const data = request.body;
	const timestamp = Date.now();
	data.timestamp = timestamp;

	database.insert(data);
	response.json(data);

	// Code to manually add data to a txt file.
	// This was for demo purposes
	//
	// fs.appendFile('myLocations.txt', JSON.stringify(data, null, '\t'), (err) => {
	// 	if (err) throw err;
	// 	console.log('Saved!');
	// });
});

app.get('/api', (request, response) => {
	database.find({}, (err, data) => {
		if (err) {
			console.log(err);
			response.end();
			return;
		}
		response.json(data);
	});
});
