/*================================
=            PACKAGES            =
================================*/
var mongoose = require('mongoose')
var Schema   = mongoose.Schema
var bcrypt   = require('bcrypt-nodejs')

/*=====  End of PACKAGES  ======*/

/*===================================
=            USER SCHEMA            =
===================================*/
var UserSchema = new Schema({
	name: String,
	username: {type: String, required: true, index: {unique: true}},
	password: {type: String, required: true, select: false}
})

/* hash the password before user is saved */
UserSchema.pre('save', function(){
	var user = this
	if(!user.isModified('password')) return next()

	/* generate the salt shaker */
	bcrypt.hash(user.password, null, null, function(err,hash) {
		if(err) return err;
		/* change password to hashed version */
		user.password = hash
		next()
	})
})

/* method to compare password with database hash */
UserSchema.methods.comparePassword = function(password){
	var user = this
	return bcrypt.compareSync(password,user.password)
}

/*=====  End of USER SCHEMA  ======*/

/*===============================
=            Exports            =
===============================*/
module.exports = mongoose.model('User', UserSchema)

/*=====  End of Exports  ======*/


