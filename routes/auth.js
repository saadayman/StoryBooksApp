const express = require("express");
const router = express.Router();
const passport = require("passport");
const { ensureAuth } = require("../middleware/authorize");
router.get("/google",passport.authenticate("google", { scope: ["profile"] }))

router.get(
  "/google/callback",
   passport.authenticate("google", {
      failureRedirect: "/"}),
  async (req, res, next) => {
   res.redirect('/dashboard')
  }
);


router.get('/logout',async(req,res,next)=>{
    req.logOut({keepSessionInfo:true},(err)=>{if(err)console.log(error)})
       res.redirect("/");
 
})
module.exports = router;
