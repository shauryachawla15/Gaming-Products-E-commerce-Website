const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');
var bcrypt = require('bcrypt');
var message = 'node server for syntax squad group project\n';
console.log(message);

//password hashing function
hashit = async function (password) {
	hash = await bcrypt.hash(password, 12);

	/*
	console.log ({
		password,
		hash
	});*/
	return hash;
};

//password comparison function
compareit = async function (password, hash) {
	const isMatch = await bcrypt.compare(password, hash);
	return isMatch;
};

//creates a connection to the mysql database 
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'student',
	password: 'student',
	database: 'syntaxsquad'
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', [path.join(__dirname, '/public'),
path.join(__dirname, '/public/html'),
path.join(__dirname, '/public/html/info'),
path.join(__dirname, '/public/html/products'),
path.join(__dirname, '/public/html/profile')
]);

app.use(session({
	/*
	in a real environment `secret` should be a random string.
	if this string is changed, secret should instead be an
	array of secret values that starts with the newest value
	and each value after is the previous secret (like a stack)
	*/
	secret: 'secret',
	/*
	resave is true because of the tutorial i followed (joseph)
	but this may change later; resave should be false if 
	we use the "touch" method which tells the server that
	the session is active; if it is true then it will save the 
	sessino automatically, useful for sessions that automatically
	expire
	*/
	resave: true,
	/*
	saves the session if it is new but not modified, might set to
	false later idk it doesnt seem that important for a class
	project perspective but the docs say false is a good idea to
	save on storage and comply with laws and stuff
	*/
	saveUninitialized: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/product', express.static('public/html/products'));


app.post('/auth', function (request, response) {
	let username = request.body.username;
	let password = request.body.password;
	if (username && password) { //if the username and password are NOT empty
		connection.query('SELECT * FROM users WHERE username = ?', [username], function (error, results, fields) {
			if (error) throw error;
			if (results.length > 0) {
				var comparison = compareit(password, results[0]['password']);
				comparison.then(function (results) {
					if (results) {
						request.session.loggedin = true;
						request.session.username = username;
						console.log('user ' + username + ' has logged in');
						response.redirect('/');
					} else {
						response.send('incorrect password');
					}
					response.end();
				});
			}
		});
	} else {
		response.send('enter name and password');
		response.end();
	}
});

app.post('/register', function (request, response) {
	let username = request.body.username;
	let bpassword = request.body.password;
	let email = request.body.email;
	if (username && bpassword && email) {
		var password = 'hi';
		let hash = hashit(bpassword);
		hash.then(function (result) {
			password = result;
			connection.query('INSERT INTO users (username, password, pfppath, email) VALUES (?, ?, \'/defaultpath.png\', ?)', [username, password, email], function (error, results, fields) {
				if (error) throw error;
				console.log('registered new user');
				response.redirect('/login');
			});
		});
	} else {
		response.send('enter name and password and email');
		response.end();
	}
});

app.post('/search', function (request, response) {
	let category = request.body.categorySelect;
	let search = request.body.search;
	if (category == 'all') {
		let query = 'SELECT * FROM products WHERE name LIKE \'%' + search + '%\'';
		var prodlist;
		connection.query(query, function (error, results, fields) {
			if (error) throw error;
			prodlist = results;
			response.render('search', { prodlist: prodlist });
		});
	}
	else {
		query = 'SELECT * FROM products WHERE name LIKE \'%' + search + '%\'';
		query.replace('\'', '\%');
		query = query + ' AND \`category\` = \'' + category + '\'';
		var prodlist;
		connection.query(query, function (error, results, fields) {
			if (error) throw error;
			prodlist = results;
			response.render('search', { prodlist: prodlist });
		});
	}

})

app.post('/unauth', function (request, response) {
	request.session.loggedin = false;
	request.session.cart = [];
	response.redirect('login');
});

app.post('/addtocart', function (request, response) {
	var cart = request.body;
	request.session.cart.push(cart);
	request.session.save(function (error) {
		if (error) throw error;
	})
})

app.post('/updateprofile', function (request, response) {
	console.log(request.body);
	let cusername = request.body.currentusername;
	let nusername = request.body.newusername;
	let cpass = request.body.currentpassword;
	let npass = request.body.newpassword;
	console.log(cusername, nusername, cpass, npass);
	if (cusername == request.body.rusername) {
		let query = 'SELECT * FROM users WHERE username = \'' + cusername + '\'';
		console.log(query);
		connection.query(query, function (error, results, fields) {
			if (error) throw error;
			console.log(results);
			var comparison = compareit(cpass, results[0]['password']);
			comparison.then(function (results) {
				if (results) {
					console.log('usernames match');
					let newpass = hashit(npass);
					newpass.then(function (result) {
						console.log(result);
						query = 'UPDATE users SET username=?, password=? WHERE username=?';
						connection.query(query, [nusername, result, cusername], function (error, results, fields) {
							if (error) throw error;
							console.log('info updated');
						})
					})

				} else {
					response.send('incorrect password');
				}
				response.redirect('/');
			});
		})
	}
})

app.get('*', function (request, response, next) {
	if (request.session.loggedin == true) {
		response.locals.username = request.session.username;
	}
	next();
})

app.get('/', function (request, response) {
	var prodlist;
	var category = request.query.category;
	if (!request.session.cart) {
		request.session.cart = [];
	}
	if (typeof category !== 'undefined') {
		connection.query('SELECT * FROM products WHERE category = ?', [category], function (error, results, fields) {
			if (error) throw error;
			prodlist = results;
			response.render('home', { prodlist: prodlist });
		});
	}
	else {
		connection.query('SELECT * FROM products', function (error, results, fields) {
			if (error) throw error;
			prodlist = results;
			response.render('home', { prodlist: prodlist });
		});
	}


});

app.get('/register', function (request, response) {
	response.render('register');
});

app.get('/login', function (request, response) {
	response.render('login');
});

app.get('/aboutus', function (request, response) {
	response.render('aboutus');
});

app.get('/contact', function (request, response) {
	response.render('contact');
});

app.get('/faq', function (request, response) {
	response.render('faq');
});

app.get('/product', function (request, response) {
	var prodlist;
	var id = request.query.id;
	if (typeof category !== 'undefined') {
		response.redirect('/404');
	}
	else {
		connection.query('SELECT * FROM products WHERE id = ?', [id], function (error, results, fields) {
			if (error) throw error;
			prodlist = results;
			response.render('product', { prodlist: prodlist });
		});
	}
})

app.get('/payment', function (request, response) {
	if (!request.session.loggedin) {
		console.log('not logged in');
		response.redirect('/login');
	} else {
		var cart = request.session.cart;
		if (cart.length != 0) {
			var idreq = 'SELECT * FROM products WHERE id IN (';
			request.session.cart.forEach(element => {
				idreq += element.id + ',';
			});
			idreq = idreq.substring(0, idreq.length - 1);
			idreq += ')';
			connection.query(idreq, function (error, results, fields) {
				if (error) throw error;
				prodlist = results;
				response.render('payment', { prodlist: prodlist });
			})
		} else {
			let prodlist = [];
			response.render('payment', {prodlist: prodlist});
		}
	}
})

app.get('/register', function (request, response) {
	response.render('register');
})

app.get('/profile', function (request, response) {
	if (request.session.loggedin == false) {
		response.redirect('/login');
	} else {
		response.render('profile');
	}
})

app.get('/404', function (request, response) {
	response.send('error!');
})

app.listen(3000);
