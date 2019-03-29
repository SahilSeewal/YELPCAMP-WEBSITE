var express         =       require("express"),
    router          =       express.Router(),
    Campground      =       require("../models/campground"),
    mongoose        =       require("mongoose"),
    middleware      =       require("../middleware")              

    var ObjectId=mongoose.Types.ObjectId


 router.get("/",function(req,res){
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err)
        }
        else{
            res.render("campground/campgrounds",{campgrounds:allCampgrounds})
        }
    })

    
 })
 router.post("/",middleware.isLoggedIn,function(req,res){
 var name=req.body.name
 var price=req.body.price 
 var image=req.body.image
 var description=req.body.description
 var author={
     id:req.user._id,
     username:req.user.username
 }
 Campground.create(
     {name:name, 
      price:price,
      image:image,
      description:description,
      author:author
    }
     ,function(err,campground){
          if(err){
              console.log(err)
          }
      else{
        req.flash("success","You successfully added campground")
         res.redirect("/campgrounds")
      }
         })
 })
 router.get("/new",middleware.isLoggedIn,function(req,res){
     res.render("campground/new")
 })
 
 router.get("/:id",function(req,res){
 Campground.findById(ObjectId(req.params.id)).populate("comments").exec(function(err,foundCampground){
 
     if(err){
         console.log(err)
     }
     else{
   res.render("campground/show",{Campgrounds:foundCampground})      
     }
 })
      
 })

 //EDIT CAMPGROUND

router.get("/:id/edit",middleware.isAuthrised1,function(req,res){
Campground.findById(req.params.id,function(err,camp){
    res.render("campground/edit",{campground:camp})
})})

router.put("/:id",middleware.isAuthrised1,function(req,res){
Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,camp){
    if(err){
        res.redirect("/campgrounds")
    }
    else{
        req.flash("success","You successfully edited campground.")
        res.redirect("/campgrounds/"+req.params.id)
    //res.render("campground/show",{Campgrounds:camp})
    }
})
})
 
router.delete("/:id",middleware.isAuthrised1,function(req,res){
Campground.findByIdAndRemove(req.params.id,function(err,camps){
    if(err){
        res.redirect("/campgrounds")
    }
    else{
        req.flash("success","You successfully deleted campground.")
     res.redirect("/campgrounds")
    }})})

    
    

    
 module.exports = router