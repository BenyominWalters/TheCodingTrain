const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

app.listen(port, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

app.post('/api', (request, response) => {
	console.log('I got a request');
	console.log(request.body);
	const data = request.body;

	fs.appendFile('myLocations.txt', JSON.stringify(data, null, '\t'), (err) => {
		if (err) throw err;
		console.log('Saved!');
	});

	response.json({
		status: 'success',
		latitude: data.lat,
		longitude: data.lng
	});
});
