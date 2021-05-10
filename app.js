const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');

const app = express();

let items = ["Buy food", "Cook food", "Eat food"];
let workItems = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

app.set('view engine', 'ejs');

// GET methods
app.get("/", (req, res) => {
    let day = date.getDate();
    res.render('list', { listTitle: day, listItems: items });
});

app.get("/work", (req, res) => {
    res.render('list', { listTitle: 'Work list', listItems: workItems} ); 
});

// POST methods
app.post("/", (req, res) => {
    let item = req.body.newItem;
    if (req.body.list === "Work list") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Server is up and running");
});