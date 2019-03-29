var express      =     require("express"),
    router       =     express.Router({mergeParams:true}),
    Campground   =     require("../models/campground"),
    Comment      =     require("../comment"),
    middleware   =     require("../middleware")
   
    router.get("/new",middleware.isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        console.log(req.params.id)
        if(err){
            console.log(err)
        }
    else{
        res.render("comment/new",{campground:campground})}})})


router.post("/",middleware.isLoggedIn,function(req,res){
Comment.create(req.body.comment,function(err,comment1){
if(err){
console.log(err) }
else{
 Campground.findById(req.params.id,function(err,campground){
if(err){
 console.log(err) }
else{
 comment1.author.id = req.user._id
 comment1.author.username=req.user.username 
 comment1.save()
 campground.comments.push(comment1)
 campground.save()
 req.flash("success","You successfully added comment.")
 res.redirect("/campgrounds/"+req.params.id)}})}})})
    
router.get("/:comment_id/edit",middleware.isAutherised,function(req,res){
    Comment.findById(req.params.comment_id,function(err,comment2){
        if(err){
            res.redirect("back")
        }
        else{
    res.render("comment/edit",{campground_id:req.params.id, comment:comment2})
        }})})
router.put("/:comment_id",middleware.isAutherised,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,comment){
      if(err){
          res.redirect("back")
      }  
      else{
        req.flash("success","You successfully edited comment.")
          res.redirect("/campgrounds/"+req.params.id)
      }})})
router.delete("/:comment_id",middleware.isAutherised,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err,comment){
        if(err){
            res.redirect("back")
        }
        else{ 
            req.flash("success","You successfully deleted comment.")
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
})
 
                    
module.exports=router