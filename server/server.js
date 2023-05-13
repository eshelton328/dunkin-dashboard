const express = require('express');
const path = require('path')
const app = express();
const PORT = 3000;

app.use(express.static('../client/dist/'));
app.use(express.json());

app.get('/*', function(req, res) {
	res.sendFile(path.join(__dirname, '../client/dist/index.html'), function(err) {
		if (err) {
			res.status(500).send(err)
		}
	})
})

app.listen(PORT, () => {
	console.log(`Server listening on PORT ${PORT}`);
})