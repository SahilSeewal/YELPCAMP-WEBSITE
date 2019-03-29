var express        =    require("express"),
    router         =    express.Router(),
    User           =    require("../models/user1")
    passport       =    require("passport")    
    middlewareObj  =    require("../middleware")
    router.get("/",function(req,res){
    res.render("landing")    
    })
    
    
    router.get("/register",function(req,res){
        res.render("register")
    })
    router.post("/register",function(req,res){
        var newUser=new User({username:req.body.username})
        User.register(newUser,req.body.password,function(err,user1){
            if(err){
                req.flash("error",err.message)
                return res.redirect("/register")
            }
            else{
                passport.authenticate("local")(req,res,function(){
                req.flash("success","You are successfully registered welcome to yelpcamp "+user1.username)
                    res.redirect("/campgrounds")
                })
            }
        })
    })
    
    router.get("/login",function(req,res){
        res.render("login")
    })
    router.post("/login",passport.authenticate("local",{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
    }),function(){})
    
    router.get("/logout",function(req,res){
        req.logout()
        req.flash("success","you have successfully logged out!!!")
        res.redirect("/campgrounds")
    })
    
    
    module.exports=router