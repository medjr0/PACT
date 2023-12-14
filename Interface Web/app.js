const express 	= require("express");
const path 		= require("path");
const bcrypt 	= require("bcrypt");
const axios 	= require("axios");

const app = express();

app.set('views', './view');
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded());
app.use(express.json()); 

var login = require('./login.json');

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: login.username,
  password: login.password,
  database: 'ineed'
});







/*************************************
********* API CITYMAPPER *************
*************************************/

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


/*************************************
***************** API ****************
*************************************/


function getCoordonates(address) {
	return axios.get("https://nominatim.openstreetmap.org/search", {
			params: {
				q: address,
				format: "json",
				addressdetails: 1,
				limit: 1,
				polygon_svg: 1
			}
		});
}
	
//getCoordonates("Gare de Lyon, Paris, 75012").then((res) => console.log(res["data"][0]["lat"] + " " + res["data"][0]["lon"])).catch((err) => console.error(err));

/*
 * Test de la BDD
 */ 

connection.connect();

/*connection.query('SELECT * FROM user', (err, rows, fields) => {
	if (err) throw err;
	console.log(rows);
})

connection.query('SELECT * FROM service WHERE isApproved=0', (err, rows, fields) => {
	if (err) throw err;
	console.log(rows.length);
	console.log(rows);
});

connection.end();*/

/*
 * API
 */
var services = require("./services.json");

var uniqueId = services["services"].length;
getUniqueId = function(){
	return uniqueId++;
}

getUnApprovedServices = function(req, res, next){
	connection.query('SELECT s.id, title, logo, address, description FROM service AS s JOIN association AS a ON s.association_id=a.id WHERE isApproved=0', (err, rows, fields) => {
		req.result = rows;
		next();
	});
}

// DANS LA BDD, ATTENTION ANGLE RAD<=>°
/*const R_TERRE = 6371;
greatCircleDistance = function(lat1, lat2, lon1, lon2){
	return 2*R_TERRE*Math.asin(Math.sqrt(Math.pow(Math.sin((lat1-lat2)/2),2) + Math.cos(lat1)*Math.cos(lat2)*Math.sin((lon1-lon2)/2));
}*/

//connection.query('UPDATE association SET lat=1.2, lon=1.3 WHERE id=1;', (err, rows, fields) => {});

//http://localhost:8080/api/services?category=3
//http://localhost:8080/api/services?category=3&lat=...&lon=...
//http://localhost:8080/api/services?lat=...&lon=...	&limit=10&page=3 => LIMIT 10 OFFSET 5

//http://localhost:8080/api/services?category=3&title=I&limit=10&page=1
getApprovedServices = function(req, res, next){
	
	//Recherche par nom
	if(req.query.category && req.query.title && req.query.limit && req.query.page){
		
		search = req.query.title + "?";
		values = [parseInt(req.query.category), String(search)];
		console.log(values);
		
		connection.query('SELECT COUNT(*) AS count FROM service AS s JOIN association AS a ON a.id=s.association_id JOIN service_category AS sc ON s.id= sc.service_id JOIN category AS c ON c.id=sc.category_id WHERE isApproved=1 AND c.id=? AND UPPER(title) LIKE UPPER(?);', req.query.category, function(err, rows, fields){
			console.log(search);
			console.log(rows);
			
			nbRecords = rows[0]["count"];
			req.nbPages = parseInt(nbRecords / req.query.limit)+1;
			
			values = [parseInt(req.query.category), String(search), parseInt(req.query.limit), parseInt((req.query.page-1)*req.query.limit)];
			console.log(values);
		
			if(nbRecords > (req.query.page-1)*req.query.limit){

				connection.query('SELECT s.id, title, logo FROM service AS s JOIN association AS a ON a.id=s.association_id JOIN service_category AS sc ON s.id=sc.service_id JOIN category AS c ON c.id=sc.category_id WHERE isApproved=1 AND c.id=? AND UPPER(title) LIKE UPPER(?) ORDER BY title LIMIT ? OFFSET ?;', values, function(err, rows, fields){
					console.log(rows);
					
					req.result=rows;
					next();
				});
			}
		});

	}
	
	//Affichage par proximité et note
	if(req.query.category && req.query.lat && req.query.lon && req.query.limit && req.query.page){

		//Calcule du nb de pages
		connection.query('SELECT COUNT(*) AS count FROM service AS s JOIN association AS a ON a.id=s.association_id JOIN service_category AS sc ON s.id= sc.service_id JOIN category AS c ON c.id=sc.category_id WHERE isApproved=1 AND c.id=?;', req.query.category, function(err, rows, fields){
			
			console.log("Calcule du nb de pages !");
			console.log(rows);
			
			nbRecords = rows[0]["count"];
			req.nbPages = parseInt(nbRecords / req.query.limit)+1;
			
			if(nbRecords > (req.query.page-1)*req.query.limit){
				
				/*values = [parseFloat(req.query.lat), parseFloat(req.query.lon), parseInt(req.query.category), parseInt(req.query.limit), (req.query.page-1)*req.query.limit];
				
				'SELECT s.id, title, logo, address, GREAT_CIRCLE_DISTANCE3(?,?,lat,lon) AS distance FROM service AS s JOIN association AS a ON a.id=s.association_id JOIN service_category AS sc ON s.id= sc.service_id JOIN category AS c ON c.id=sc.category_id WHERE isApproved=1 AND c.id=? ORDER BY distance LIMIT ? OFFSET ?;'*/
				
				values = [parseFloat(req.query.lat), parseFloat(req.query.lon), parseFloat(req.query.lat), parseFloat(req.query.lon), parseInt(req.query.category), parseInt(req.query.limit), (req.query.page-1)*req.query.limit];
				
				//Formule pour calculer la pertinence ???
				connection.query('SELECT s.id, title, logo, address, (AVG(rating)+1) AS avg_rating, GREAT_CIRCLE_DISTANCE3(?,?,lat,lon) AS distance, (AVG(rating)+1) * 1/GREAT_CIRCLE_DISTANCE3(?,?,lat,lon) AS pertinence FROM service AS s JOIN association AS a ON a.id=s.association_id JOIN service_category AS sc ON s.id=sc.service_id JOIN category AS c ON c.id=sc.category_id JOIN rating AS r ON s.id=r.service_id WHERE isApproved=1 AND c.id=? GROUP BY r.service_id ORDER BY pertinence DESC LIMIT ? OFFSET ?;', values, (err, rows, fields) => {
					
					console.log("Liste des services :");
					console.log(rows);
					
					req.result = rows;
					next();
				});
			} else {
				//Erreur, la page demandée n'exite pas !
				
				next();
			}
		});
	}
	
	/*if(req.query.category){
		//console.log(req.query.category);
		connection.query('SELECT s.id, title, logo, address, lat, lon FROM service AS s JOIN association AS a ON a.id=s.association_id JOIN service_category AS sc ON s.id= sc.service_id JOIN category AS c ON c.id=sc.category_id WHERE isApproved=1 AND c.id=?;', req.query.category, (err, rows, fields) => {
			req.result = rows;*/
			//console.log(rows);
			
			/*
			 * À exécuter lors de l'ajout d'un service plutôt
			 */
			/*if(rows[0]["lat"] == null && rows[0]["lon"] == null){
				getCoordonates(rows[0]["address"]).then((res) => {
					//console.log(res);
					values = [parseFloat(res["data"][0]["lat"]), parseFloat(res["data"][0]["lon"]), rows[0]["id"]];
					//console.log(values);
					connection.query('UPDATE association SET lat=?, lon=? WHERE id=?;', values, (err, rows, fields) => {
						//console.log(rows);
						next();
					});
				});
			}*/
			
		/*	next();
		});
	}*/
	
	/*connection.query('SELECT * FROM service WHERE isApproved=1', (err, rows, fields) => {
		req.result = rows;
		next();
	});*/
}

getService = function(isApproved, req, res, next){
	
	//Récupération du service
	data = [isApproved, req.params.id]
	connection.query('SELECT * FROM service WHERE isApproved=? AND id=?;', data, (err, rows, fields) => {
		console.log("Récupération du service")
		console.log(rows);
		console.log(err);
		
		req.result1=rows;
		
		//Récupération de l'association associée
		connection.query('SELECT * FROM association WHERE id=?', req.result1[0]["association_id"], (err, rows, fields) => {
			console.log("Récupération de l'association associée");
			console.log(rows);
			
			req.result2=rows;
    		next();
		});
	});
}

getCategories = function(req, res, next){
	connection.query('SELECT * FROM category', (err, rows, fields) => {
		req.result = rows;
		next();
	});
}

disconnect = function(req, res, next){
	connected = false;
	next();
}

var user;
connect = function(req, res, next){
	var users;
	connection.query('SELECT * FROM user', (err, rows, fields) => {
		users = rows;
		
		user = users.find(user => user.mail === req.body.mail);
		if (user == null) {
			connected = false;
			res.setHeader('Content-Type', 'text/html');
			res.status(404).render("notfound.ejs");
		}else{
			if(req.body.password == user.psw) {
				connected = true;
			} else {
				connected = false;
			}
		}
		next();
	});
}

var deleted = false;
var approved = false;
var added = false;
var finished = false;

unNotify = function(){
	deleted = false;
	approved = false;
	added = false;
}

// Supprime le service de la bdd
deleteService = function(req, res, next){
	connection.query('DELETE FROM service WHERE id=?;', req.params.id, (err, rows, fields) => {
		deleted = true;
		next();
	});
}

approveService = function(req, res, next){
	connection.query('UPDATE service SET isApproved=1 WHERE id=?;', req.params.id, (err, rows, fields) => {
		approved = true;
		next();
	});
}

//http://localhost:8080/api/services?category=3&lat=43.453892&lon=6.753925&limit=10&page=1
app.get("/api/services", getApprovedServices, function(req, res){
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({nbPages: req.nbPages, services: req.result});
});

app.get("/api/services/:id", (req, res, next) => getService(1,req, res, next) , function(req, res){
	//console.log(req.params.id);
    res.setHeader('Content-Type', 'application/json');
	req.result1[0]["association"] = req.result2[0];
    res.status(200).json({service: req.result1[0]});
});

// Utiliser pour le débugage uniquement
app.get("/api/unApprovedServices", getUnApprovedServices, function(req, res){
	console.log(req.result);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(req.result);
});

app.get("/api/categories", getCategories, function(req,res){
	res.setHeader('Content-Type', 'application/json');
    res.status(200).json({categories: req.result});
});

vote = function(req, res, next){
		
	if(!(req.query.rating == 1 || req.query.rating == -1)){
		next();
	}
	
	connection.query("SHOW TABLE STATUS WHERE name=\"service\";", (err,rows,fields) => {
		
		if(req.params.id >= rows[0]["Auto_increment"]){
			next();
		}
		
		values = [req.params.id, req.query.user_key];
		connection.query("SELECT * FROM rating WHERE service_id=? AND user_key=?;", values,(err, rows, fields) => {
			//console.log(rows);

			//Test d'unicité
			if(typeof(rows) == 'undefined' || rows.length == 0){
				//console.log("ah");
				values = [req.params.id, req.query.user_key, parseInt(req.query.rating)];
				connection.query("INSERT INTO rating(service_id, user_key, rating) VALUES (?,?,?);", values, (err, rows, fields) => {
					next();
				});
				next();
			} else {
				//console.log("oj");
				values = [parseInt(req.query.rating), req.params.id, req.query.user_key];
				connection.query("UPDATE rating SET rating=? WHERE service_id=? AND user_key=?;", values, (err, rows, fields) => {
					next();
				});
			}
		});
	});
}

//https://localhist:8080/api/services/1?user_key=123&rating=1
app.post("/api/services/:id", vote, function(req, res){
	res.setHeader('Content-Type', 'application/json');
    res.status(200).json("ok");
});

/*
 * Site Web
 */
var connected = false;
app.use(function(req,res,next){
	if(!connected && req.path != "/login"){
		if(!req.path.includes("api") && req.path != "/signup"){
			return res.redirect("/login");
		}
	}
	next();
});

app.get("/", getUnApprovedServices, function(req, res){
	res.setHeader('Content-Type', 'text/html');
	if(user["role"] == "Admin"){
		res.render("dashboard.ejs", {data: req.result, approved: approved, deleted: deleted, finished: finished});
		unNotify();
	}
	if(user["role"] == "Association"){
		res.redirect("/add");
	}
});

app.get("/approve/:id", approveService, function(req, res){
	if(approved){
		res.setHeader('Content-Type', 'text/html');
		res.redirect("/");
	} else {
		res.status(404).render("404.ejs");
	}
});

app.get("/rm/:id", deleteService, function(req, res){
	if(deleted){
		res.setHeader('Content-Type', 'text/html');
		res.redirect("/");
	} else {
		res.status(404).render("404.ejs");
	}
});

app.get("/add", getCategories, function(req,res){
	if(user["role"] == "Association"){
		console.log(req.result);
		res.setHeader('Content-Type', 'text/html');
		res.render("form.ejs", {added: added, categories: req.result});
		unNotify();
	} else {
		res.redirect("/");
	}
});

/*addService = function(req, res, next){
	let service = new Object();
	service["id"] = getUniqueId();
	service["title"] = req.body.title;
	service["adress"] = req.body.adress;
	service["description"] = req.body.description;
	service["logo"] = req.body.logo;
	service["approved"] = false;
	services["services"].push(service);
	added = true ;
	next();
}*/

addService = function(req, res, next){
		
	console.log(req.body.category);
	data = [req.body.title, req.body.logo, req.body.description, user["association_id"], 0];
	connection.query("INSERT INTO service(title, logo, description, association_id, isApproved, price) VALUES(?,?,?,?,0,?);", data, (err, rows, fields) => {
		console.log(rows);
		
		data = [req.body.title, req.body.category];
		connection.query("INSERT INTO service_category(service_id, category_id) VALUES((SELECT id FROM service WHERE title=? LIMIT 1),(SELECT id FROM category WHERE category=?));", data, (err, rows, fields) => {
			
			console.log(rows);
			
			connection.query("INSERT INTO rating(service_id, rating) VALUES((SELECT id FROM service WHERE title=? LIMIT 1),1);", data, (err, rows, fields) => {
				console.log(rows);
				
				added = true;
				next(); 
			});
		});
	});
}

app.post("/add", addService, function(req, res){
	added = true;
	res.redirect("/add");
});

app.get("/login", function(req,res){
	if(false){
		res.redirect("/");
	} else {
		res.render("login.ejs");
	}
});

app.post("/login", connect, function(req,res){
	res.redirect("/");
});

app.get("/signup", function(req,res){
	res.setHeader('Content-Type', 'text/html');
    res.render("signup.ejs");
});

signup = function(req, res, next){
	
	getCoordonates(req.body.address).then((coord) => {
		
		data = [req.body.name, req.body.phone, req.body.address, req.body.contact, req.body.website, coord["data"][0]["lat"], coord["data"][0]["lon"]]
		connection.query('INSERT INTO association(name, phone, address, mail, website, lat, lon) VALUES (?,?,?,?,?,?,?)', data, (err, rows, fields) => {
			
			data = [req.body.name, req.body.email, req.body.password, req.body.name]
			connection.query('INSERT INTO user(name, mail, psw, role, association_id) VALUES (?,?,?,"Association", (SELECT id FROM association WHERE name=? LIMIT 1));', data , (err, rows, fields) => {
				
				next();
			});
		});
	});
}

app.post("/signup", signup, function(req,res){
	res.redirect("/login");
});

app.get("/logout", disconnect, function(req,res){
	res.redirect("/login");
});

passwordChanged = false;
app.get("/account", function(req, res){
	res.setHeader('Content-Type', 'text/html');
	res.render("account.ejs", {user: user, passwordChanged: passwordChanged});
});

updateAccount = function(req, res, next){
	data = [req.body.password, req.params.id]
	connection.query('UPDATE user SET psw=? WHERE id=?', data,  (err, rows, fields) => {
		console.log(err);
		console.log(rows);
		passwordChanged = true;
		next();
	});
}

app.get("/service/:id", (req, res, next) => getService(0, req, res, next), function(req, res){
    res.setHeader('Content-Type', 'text/html');
	req.result1[0]["association"] = req.result2[0];
	res.render("serviceDashboard.ejs", {data: req.result1[0]});
});

app.post("/account/:id", updateAccount, function(req, res){
	res.redirect("/account");
});

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/html');
    res.status(404).render("404.ejs");
});

app.listen(8080);
