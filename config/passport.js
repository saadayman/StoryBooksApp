const mongoose = require('mongoose')
const User = require("../model/User")
const passport = require('passport')
const GoogleStratgey = require('passport-google-oauth20').Strategy

module.exports = async(passport)=>{
passport.use(
  new GoogleStratgey(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
    },
    async(accessToken, refreshToken, profile, cb) => {
        const newUser = {
            googleId:profile.id,
            displayName:profile.displayName,
            firstName:profile.name.givenName,
            lastName:profile.name.familyName,
            photos:profile.photos[0].value

        }
        try {
            let user = await User.findOne({googleId:profile.id})
            if(user){
                console.log(user)
                cb(null,user)
            }else{
                user = await User.create(newUser);
                cb(null, user);
            }
        
            
        } catch (error) {
            console.error(error)
        }
    }
  )
);
passport.serializeUser((user,cb)=>{
    cb(null,user.id)
 
}
   
)
passport.deserializeUser((id, cb) => {
 
  User.findById(id,(err,user)=>{
     cb(err, user);
    })

});

}

