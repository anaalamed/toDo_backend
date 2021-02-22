const express = require('express'); // from node_modules
const cors = require('cors');
const morgan = require('morgan');

const todosRouter = require('./routes/todos');
const { checkUsersHeaders, checkExistingUser } = require('./middlewares/auth');
const {connect} = require('./mongo-db');

connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/todos')
	.then(() => console.log('MONGODB is connected'))
	.catch(() => {
		console.log('MONGODB is not connected');
		process.exit(1);
	});

const app = express();

// middleware
app.use(morgan('combined'));
app.use(cors()); // add relevant headers 
app.use(checkUsersHeaders); // if there is userId in headers
app.use(checkExistingUser); // if there is user in db

app.use(todosRouter);

// frontend from the internet 
// app.use( express.static( __dirname + '/frontEnd'));

app.listen(process.env.PORT || 3000, () => console.log('listening on http://localHost:3000'));













//_______________________________________________________________
// -------------------------- examples --------------------------
//_______________________________________________________________

// ---------------------------- res.json ------------------------
app.get('/hello', (req, res) => {
    res.json({
        a: 5,
        b: 7,
        hello: 'world'
    })
});

// ---------------------------- req.querry -----------------------
app.get('/world', (req, res) => {
    console.log(req.query); // q=....   on link
    // res.send('world!');
    res.json(req.query);
});

// ---------------------------- req.params -----------------------
app.get('/api/shop/:category/:product', (req, res) => {
    const { category, product } = req.params;
    res.json(req.params);
});
 // ________________________________________________________________


