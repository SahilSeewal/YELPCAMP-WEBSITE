var express      =     require("express"),
    router       =     express.Router({mergeParams:true}),
    Campground   =     require("../models/campground"),
    Comment      =     require("../comment"),
    middleware   =     require("../middleware")
   
    router.get("/new",middleware.isLoggedIn,function(req,res){
    Campground.findById(req.params.id).then((campground)=>{
        console.log(req.params.id)
        res.render("comment/new",{campground:campground})}).catch((err)=>{
            console.log(err)
        })})


router.post("/",middleware.isLoggedIn,function(req,res){
Comment.create(req.body.comment,function(err,comment1){
if(err){
console.log(err) }
else{
 Campground.findById(req.params.id).then((campground)=>{
 comment1.author.id = req.user._id
 comment1.author.username=req.user.username 
 comment1.save()
 campground.comments.push(comment1)
 campground.save()
 req.flash("success","You successfully added comment.")
 res.redirect("/campgrounds/"+req.params.id)}).catch((err)=>{
    console.log(err)
 })}})})
    
router.get("/:comment_id/edit",middleware.isAutherised,function(req,res){
    Comment.findById(req.params.comment_id).then((comment2)=>{
    res.render("comment/edit",{campground_id:req.params.id, comment:comment2})
        }).catch((err)=>{
            res.redirect("back")
        })
    })
router.put("/:comment_id",middleware.isAutherised,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment).then((comment)=>{
        req.flash("success","You successfully edited comment.")
          res.redirect("/campgrounds/"+req.params.id)
      }).catch((err)=>{
        res.redirect("back")
      })})
router.delete("/:comment_id",middleware.isAutherised,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err,comment){

            req.flash("success","You successfully deleted comment.")
            res.redirect("/campgrounds/" + req.params.id)
        
    }).catch((err)=>{
        res.redirect("back")
    })
})
 
                    
module.exports=router