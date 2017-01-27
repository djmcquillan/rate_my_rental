/*=====================================
=            CALL PACKAGES           =
=====================================*/
var express 	  = require('express')
var mongoose    = require('mongoose')
var app			 	  = express()
var bodyParser 	= require('body-parser')
var morgan	  	= require('morgan')
var port 	  		=	process.env.PORT || 8080

/*=====  End of CALL PACKAGES ======*/

/*=============================================
=            REQUIRE MODELS           =
=============================================*/
var User = require('../app/models/users')

/*=====  End of REQUIRED MODELS ======*/

/*=========================================
=            APP CONFIGURATION            =
=========================================*/
/* body parser to grab info from post requests */
app.use(bodyParser.urlencoded({extended: true }))
app.use(bodyParser.json())

/* configure app for CORS requests */
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow_Origin', '*')
	res.setHeader('Access-Control-Allow_Methods', 'GET, POST')
	res.setHeader('Access-Control-Allow_Headers', 'X-Requested-With, content-type, Authorization')
	next()
})

/* Log Requests to console using morgan */
app.use(morgan('dev'))

/*=====  End of APP CONFIGURATION  ======*/

/*===================================================================================
=            API ROUTES/ENDPOINTS - move to diff folder before deploying            =
===================================================================================*/
/* set root route */
app.get('/', function(req,res) {
	res.send('Welcome to the home page')
})

/* get instance of router */
var apiRouter = express.Router()


/* router test: accessed at GET http://localhost:8080/api */
apiRouter.get('/', function(req,res) {
	res.json({ message: 'congrats muddafugga you accessed the api'})
})

	/*----------  ROUTE MIDDLEWARE - place after create   ----------*/
apiRouter.use(function(req,res, next){
	console.log('someone just accessed the app')
	next()
})

/* Actions for Routes with endpoint /users */
apiRouter.route('/users')
	/* create user -- POST */
	.post(function(req,res){
		var user = new User()
		user.name = req.body.name
		user.username = req.body.username
		user.password = req.body.password

		/* Save user and check for errors */
		user.save(function(err) {
			if(err) {
				if(err.code === 11000)
					return res.json({success: false, message: 'A user with that username already exists'})
				else
					return res.send(err)
			}
			res.json({message: 'New User Created!'})
		})
	})

	/* Get All Users -- GET */
	.get(function(req,res){
		User.find(function(err,users){
			if(err) throw err
			/* return users in json */
			res.json(users)
		})
	})

	/* Actions for Routes with endpoint /users/user_id */
	apiRouter.route('/users/:user_id')
	/* get user by id */
	.get(function(req,res){
		User.findById(req.params.user_id, function(err,user){
			if(err) throw err
				res.json(user)
		})
	})

	/* update user info by id */
	.put(function(req,res){
		User.findById(req.params.user_id, function(err,user){
			if(err) throw err
				/* update user info only if it is new info */
				if(req.body.name) user.name = req.body.name
				if(req.body.username) user.username = req.body.username
				if(req.body.password) user.password = req.body.password

				/* save updates */
				user.save(function(err){
					if(err) throw err
						res.json({message: 'User Updated successfully'})
				})	
		})
	})



	
/* Register Routes - all routes prefixed with /api */
app.use('/api', apiRouter)


/*=====  End of API ROUTES/ENDPOINTS - move to diff folder before deploying  ======*/

/*==============================
=            SERVER           =
==============================*/
app.listen(port)
console.log('check out port ' + port)


/*=====  End of SERVER  ======*/

/*================================
=            DATABASE            =
================================*/
mongoose.connect('mongodb://localhost/rateRentalDB', function ( err ) {
    if ( err ) {
        return console.log( 'cannot connect' )
    }
    console.log( 'connected to local mongoDB successfully!')
})


/*=====  End of DATABASE  ======*/



