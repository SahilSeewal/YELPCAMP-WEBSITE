var express= require("express"),
    bodyParser=require("body-parser"),
    mongoose=require("mongoose"),
    Campground=require("./models/campground"),
    Comment=require("./comment"),
    seedDB1=require("./seeds"),
    passport=require("passport"),
    LocalStratergy=require("passport-local"),
    passportLocalMongoose=require("passport-local-mongoose"),
    expressSession=require("express-session"),
    User=require("./models/user1"),
    campgroundRouter=require("./routes/campgrounds"),
    commentRouter=require("./routes/comments"),
    indexRouter=require("./routes/index"),
    methodOverride=require("method-override"),
    flash=require("connect-flash")
    var ObjectId=mongoose.Types.ObjectId
  
console.log("***************** DO WHEN REQUIRED ******************")
    //seedDB1()
console.log("***************** DO WHEN REQUIRED ******************")

    var app=express()
    app.use(require("express-session")({
        secret:"this is good",
        resave:false,
        saveUninitialized:false
    }))
  
    app.use(flash())
    app.use(passport.initialize())
    app.use(passport.session())
    passport.serializeUser(User.serializeUser())
    passport.deserializeUser(User.deserializeUser())
    app.use(function(req,res,next){
        res.locals.currentUser=req.user
        res.locals.error=req.flash("error")
        res.locals.success=req.flash("success")
        next();
    })
    passport.use(new LocalStratergy(User.authenticate()))
    app.use(methodOverride("_method"))
    app.use(express.static(__dirname + "/public"))
    app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine","ejs")
// mongoose.connect("mongodb://localhost:27017/yelp_camp_12",{useNewUrlParser:true})
mongoose.connect("mongodb://127.0.0.1:27017/yelp_camp_12",{useNewUrlParser:true})

console.log("**********************")
console.log("one time use")

/*
Campground.create({
    name: "Salmon Creek",
    image:"https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg",
    description: "this the very good campground"
})
*/
console.log("*****************************")

/* var campgrounds=[
    {name:"Salmon Creek",image:"https://pixabay.com/get/e136b80728f31c22d2524518b7444795ea76e5d004b0144590f9c478a4eab2_340.jpg"},
    {name:"Granite Hill",image:"https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
    {name:"Mountain Goats Rest",image:"https://farm5.staticflickr.com/4099/4766940982_f1c397ab95.jpg"},
    {name:"Salmon Creek",image:"https://pixabay.com/get/e136b80728f31c22d2524518b7444795ea76e5d004b0144590f9c478a4eab2_340.jpg"},
    {name:"Granite Hill",image:"https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
    {name:"Mountain Goats Rest",image:"https://farm5.staticflickr.com/4099/4766940982_f1c397ab95.jpg"},
    {name:"Salmon Creek",image:"https://pixabay.com/get/e136b80728f31c22d2524518b7444795ea76e5d004b0144590f9c478a4eab2_340.jpg"},
    {name:"Granite Hill",image:"https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
    {name:"Mountain Goats Rest",image:"https://farm5.staticflickr.com/4099/4766940982_f1c397ab95.jpg"},
    {name:"Salmon Creek",image:"https://pixabay.com/get/e136b80728f31c22d2524518b7444795ea76e5d004b0144590f9c478a4eab2_340.jpg"},
    {name:"Granite Hill",image:"https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
    {name:"Mountain Goats Rest",image:"https://farm5.staticflickr.com/4099/4766940982_f1c397ab95.jpg"}]
*/

app.use("/campgrounds",campgroundRouter)
app.use("/campgrounds/:id/comments",commentRouter)
app.use("/",indexRouter)
app.listen(3000,function(){
    console.log("started")
})

