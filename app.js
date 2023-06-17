const express = require("express");
const bodyParser = require("body-parser");
// const https = require("https")

const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('publich'))
app.set('view engine', 'ejs');

let items = [];


app.get("/", function(req, res){
    var today = new Date()
    var currentDay = today.getDay()
    let day = ""
    let days = ["Sunday", "Monday", "Tuesday","Wednesday", "Thursday",
    "Friday", "Saturday"]
    const specDay = days[currentDay]

    if (currentDay === 6 || currentDay === 0){
        day = "Weekend ⛸"
    } else {
        day = "Weekday 😎"
    }

    res.render("list", {
        specificDay: specDay,
        items: items
    });
    
});

app.post("/", function(req, res){
    const item = req.body.task;
    if (item != ""){
        items.push(item);
        res.redirect("/");
    } else{
        res.redirect("/");
    }
})


app.listen(process.env.PORT || 3000, function(){
    console.log("Node server port 3000 live 😎")
});
