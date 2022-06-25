const express = require('express');
const { ensureAuth } = require('../middleware/authorize');
const router = express.Router()
const Story = require('../model/Story')

//@desc add stories
//@ route post/stoires/add
router.get('/',ensureAuth,async(req,res)=>{
    try {
        const stories = await Story.find({status:'public'}).populate('user').sort({createdAt:1}).lean()
     
        res.render('stories/public_stories',{stories})
    } catch (error) {
        console.log(error)
        res.render('error/500')
    }
})
router.get('/edit/:id',ensureAuth,async(req,res,next)=>{

    
let story = await Story.findById(req.params.id).lean()
if(!story){
   return res.render('error/400')
}
if(req.user._id.toString()!==story.user._id.toString()){
     res.redirect('/stories')
}else{
res.render("stories/edit", { story });
}


})

router.get("/add",ensureAuth,(req,res)=>{

    res.render('stories/add')

});




router.post("/add",ensureAuth,async(req,res,next)=>{
    console.log(req.user.id)
    try {
         req.body.user = req.user.id;
         let story = await Story.create(req.body);
         res.redirect("/dashboard");
    } catch (error) {
        console.log(error)
        res.render('error/500')
    }
   

})
//PUT REQUEST TO UPDATE THE STORIES
router.put('/edit/:id',ensureAuth,async(req,res,next)=>{
    let story = await Story.findById(req.params.id).lean()
    if(!story){
        return res.render('error/404')
    }
    if (req.user._id.toString() !== story.user._id.toString()) {
      res.redirect("/stories");
    } else {
     story = await Story.findOneAndUpdate({_id:req.params.id},req.body,{
    new:true,
    runValidators:true,
})
res.redirect('/dashboard')
    }

})

router.delete('/:id',ensureAuth,async(req,res)=>{
      let story = await Story.findById(req.params.id).lean();
      if (!story) {
        return res.render("error/404");
      }
      if (req.user._id.toString() !== story.user._id.toString()) {
        res.redirect("/stories");
      } else {
        story = await Story.findOneAndDelete({ _id: req.params.id });
        res.redirect("/dashboard");
      }
})


router.get("/user/:id",ensureAuth,async(req,res)=>{

try {
    const stories = await Story.find({ user: req.params.id }).populate('user').lean();
    console.log(stories)
    if(!stories){
        return res.render('error/404')
    }else{
        res.render('stories/public_stories',{
            stories
        })
    }
    
} catch (error) {
    res.render('error/500')
}



})

router.get('/:id',ensureAuth,async(req,res)=>{
  
    try{
  const story = await Story.findById(req.params.id).populate('user').lean();
  console.log(story)
  if(!story){
   return res.render('error/404')
  }
  else{
    res.render('stories/story',{story})

  }

    }
    catch(error){
        console.log(error)
        res.render('error/500')
    }
    
})
module.exports = router
