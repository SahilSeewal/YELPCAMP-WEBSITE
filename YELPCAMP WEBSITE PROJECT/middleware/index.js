var Campground=require("../models/campground"),
 Comment=require("../comment")

var middlewareObj={}
middlewareObj.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated()){
      
        return next()}
    req.flash("error","Please login first.")       
    res.redirect("/login") }

    middlewareObj.isAuthrised1=function(req,res,next){
        if(req.isAuthenticated()){
           Campground.findById(req.params.id,function(err,camp){
            if(err)
            {
                res.redirect("back")
            }
            else{
                if(String(camp.author.id) == req.user._id){
                    next()
                }
                else{
            req.flash("error","You are not permitted to do so.")
                    res.redirect("back")}}}) } }

    middlewareObj.isAutherised=function(req,res,next){
    if(req.isAuthenticated){
    Comment.findById(req.params.comment_id,function(err,comment1){
    if(err){
    res.redirect("back")}
    else{if(String(comment1.author.id) == req.user._id)
    next()   
    else{
    req.flash("error","You are not permitted to do so.")
    res.redirect("back")}}})}}
    
    module.exports=middlewareObj