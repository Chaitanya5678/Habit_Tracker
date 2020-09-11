const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

//Using passport-local strategy and configuring it

passport.use(new LocalStrategy({

    usernameField: 'email',
    passReqToCallback: true

    },

    function(req,email,password,done){

        //find a user and establish identity

        User.findOne({email:email}, function(err,user)
        {
            if(err){
                req.flash('error', err);
                return done(err);
            }

            if(!user || user.password != password)
            {
                req.flash('error', 'Invalid Username/Password');
                return done(null,false);
            }

            return done(null,user);

        });
    }

));

//serializing the user to decide which key to be put into the cookie

passport.serializeUser(function(user,done){
    done(null,user.id);
});


//deserializing the user from the key in the cookies

passport.deserializeUser(function(id,done){

    User.findById(id, function(err,user){

        if(err)
        {
            console.log('Error in finding user');
            return done(err);
        }

        return done(null,user);
    });

});

//check if the user is authenticated
passport.checkAuthentication = function(req, res, next)
{
    if(req.isAuthenticated())
    {
        return next();
    }

    return res.redirect('/users/sign-in');

}

//set if a user is authenticated
passport.setAuthenticatedUser = function(req,res,next)
{
    if(req.isAuthenticated())
    {
        res.locals.user = req.user;
    }

    next();
}

module.exports = passport;