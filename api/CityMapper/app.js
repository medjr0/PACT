const express = require("express");
const path = require("path");
const axios = require("axios");

const app = express();

app.set('views', './');
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '')));
app.use(express.urlencoded());
app.use(express.json());

const https = require('https');

function promiseCoordonates(statut, ret) {
	if (statut) {
		return Promise.resolve(ret);
	} else {
		return Promise.reject(ret);
	}
}

function getCoordinates(address) {
	return axios.get("https://nominatim.openstreetmap.org/search", {
		params: {
			q: address,
			format: "json",
			addressdetails: 1,
			limit: 1,
			polygon_svg: 1
		}
	}).then((response) => promiseCoordonates(true, response)).catch((error) => promiseCoordonates(false, error));
}

/*axios.get("https://api.external.citymapper.com/api/1/directions/transit", {
	headers: {
		"Citymapper-Partner-Key": "zFLqQDDyuHfgS94ElXFJZvGG7LJFlA29",
	},
	params: {
		start: "48.8480743,2.3441925",
		end: "48.7129116,2.1998893"
	}
}).then(response => console.log(response)).catch(console.log("Ouie"));*/

/*https.get('https://api.external.citymapper.com/api/1/directions/transit?start=48.8480743,2.3441925&end=48.7129116,2.1998893', 
	  {
			headers: {
				'Content-Type': 'application/json',
				'Citymapper-Partner-Key': 'zFLqQDDyuHfgS94ElXFJZvGG7LJFlA29'
			}
		}, 
	  (resp) => {
			let data = '';

			resp.on('data', (chunk) => {
				data += chunk;
			});

			resp.on('end', () => {
				res.setHeader('Content-Type', 'application/json');
				res.status(200).send(JSON.parse(data));
			});
		}).on('error', (err) => {
			console.log(err);
			res.setHeader('Content-Type', 'text/plain');
			res.status(resp.statusCode);
		});*/

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", '*');
	res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	res.header("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT,DELETE,OPTIONS");
	res.header("Access-Control-Allow-Credentials", "true");
	next();
});

app.get("/ouch", function (req, res) {
	start = req.query.start.split(' ').join('+');
	end = req.query.end.split(' ').join('+');
	Promise.all([getCoordinates(req.query.start), getCoordinates(req.query.end)]).then(function (response) {

		//console.log(response[0]["data"][0])
		//console.log(response[1]["data"][0]);

		let itinerate = [
			parseFloat(response[0]["data"][0]["lat"]).toFixed(4) + "," + parseFloat(response[0]["data"][0]["lon"]).toFixed(4),
			parseFloat(response[1]["data"][0]["lat"]).toFixed(4) + "," + parseFloat(response[1]["data"][0]["lon"]).toFixed(4)
		];

		https.get('https://api.external.citymapper.com/api/1/directions/transit?start=' + itinerate[0] + '&end=' + itinerate[1], {
				headers: {
					'Content-Type': 'application/json',
					'Citymapper-Partner-Key': 'zFLqQDDyuHfgS94ElXFJZvGG7LJFlA29'
				}
			},
			(resp) => {
				//console.log('https://api.external.citymapper.com/api/1/directions/transit?start='+itinerate[0]+'&end='+itinerate[1]);
				//console.log(resp.statusCode);

				let data = '';

				resp.on('data', (chunk) => {
					data += chunk;
				});

				resp.on('end', () => {
					/*res.setHeader("Content-Type", "text/html");
					fdata = JSON.parse(data);
					res.render("index.ejs", {data: fdata});*/
					res.setHeader("Content-Type", "application/json");
					res.status(200).send(JSON.parse(data));
				});
			}).on('error', (err) => {
			console.log(err);
			res.status(400).send(err);
		});

	}).catch((error) => {
		console.log(error)
		res.status(400).send(error);
	});
});

app.use(function (req, res, next) {
	res.setHeader('Content-Type', 'text/html');
	res.status(404).send("Aie");
});

app.listen(8080);