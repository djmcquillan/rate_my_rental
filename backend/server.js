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
	res.setHeader('Access-Control-Allow_Headers', 'X-Requested-With, content-type, \Authorization')
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
mongoose.connect('mongodb://localhost/rateRentalDB')


/*=====  End of DATABASE  ======*/



