const express = require('express')
const router = express.Router()
const {ensureAuth,ensureGuest} = require('../middleware/authorize')
const Story = require('../model/Story')
//@desc Login/Landing Page
//@route GET/
router.get('/',ensureGuest,(req,res,next)=>{
    res.render('login',{layout:'login'});
})
//@desc DashBoard
//@route GET/dashboard
router.get('/dashboard',ensureAuth,async(req,res,next)=>{
    let stories = await Story.find({ user: req.user.id }).lean();
    res.render('dashboard',{name:req.user.firstName,stories});
})



module.exports = router;