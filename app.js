const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs');

let items = [];
let work_items = [];

//fascinating piece of coding by GTP to determine whether to use st,nd,rd, 4th. Give it to to it to get an explanation of how it works
function getOrdinal(n) {
    var s = ["th", "st", "nd", "rd"],
        v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

//-----------------------------Generating Heading-----------------------------//

var today = new Date()
let months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];
let emojies = ["🥶", "🥰", "🍀", "🌷", "🎖", "☀️", "🍉", "😎", "📚", "🎃", "🦃", "🎄"]

let day = getOrdinal(today.getDate());
let month = months[today.getMonth()];
let year = today.getFullYear();
let formattedDate = emojies[today.getMonth()] + " " + day + " of " + month +
    " " + year + " " + emojies[today.getMonth()];

//----------------------------------------------------------------------------//

app.get("/", function (req, res) {
    res.render("list", {
        ListTitle: formattedDate,
        items: items
    });

});

app.get("/work", function (req, res) {
    res.render("list", {
        ListTitle: "🏋️‍♂️ Work List 🏋️‍♂️",
        items: work_items,

    });
})


app.post("/", function (req, res) {
    const item = req.body.task;

    if (item !== "") { // Ensure the item is not an empty string
        if (req.body.list === "🏋️‍♂️ Work List 🏋️‍♂️") {
            work_items.push(item);
            res.redirect("/work");
        }
        else {
            items.push(item);
            res.redirect("/");
        }
    }
    else { // If item is an empty string, redirect to the originating list
        if (req.body.list === "🏋️‍♂️ Work List 🏋️‍♂️") {
            res.redirect("/work");
        }
        else {
            res.redirect("/");
        }
    }
})


app.listen(process.env.PORT || 3000, function () {
    console.log("Node server port 3000 live 😎")
});
