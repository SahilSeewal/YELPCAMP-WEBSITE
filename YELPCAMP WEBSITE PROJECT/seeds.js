var mongoose=require("mongoose")
var Campground=require("./models/campground")
var Comment=require("./comment.js")
var data=[{name:"Tsomoriri Camp",
           image:"https://www.holidify.com/blog/wp-content/uploads/2016/08/Tsomoriri.jpg",
            description:"Tsomoriri Lake is the highest lake in the world and located in Ladakh. Camping here is the experience of a lifetime. The lake is completely frozen during the winters and is an excitingly unique thing to witness."},
            {name:"Tsomoriri Camp",
           image:"https://www.holidify.com/blog/wp-content/uploads/2016/08/Tsomoriri.jpg",
            description:"Tsomoriri Lake is the highest lake in the world and located in Ladakh. Camping here is the experience of a lifetime. The lake is completely frozen during the winters and is an excitingly unique thing to witness."},
            {name:"Tsomoriri Camp",
           image:"https://www.holidify.com/blog/wp-content/uploads/2016/08/Tsomoriri.jpg",
            description:"Tsomoriri Lake is the highest lake in the world and located in Ladakh. Camping here is the experience of a lifetime. The lake is completely frozen during the winters and is an excitingly unique thing to witness."}   
        
        ]
        
        function seedDB(){
Campground.remove({},function(err,campground){
    if(err)
    console.log(err)
    else{console.log("removed")}        
data.forEach(function(campground1){
Campground.create(campground1,function(err,campground2){
if(err)
{console.log(err)}
else{
console.log("added")
Comment.create({text:"this place is ossom",
                author:"xyz"},function(err,comment1){
                campground2.comments.push(comment1)
                campground2.save()
                })
}})})  })}

module.exports = seedDB;