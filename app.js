const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Set up EJS as the view engine
app.set("view engine", "ejs");

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// In-memory list to store todo items
let items = [];

// GET: Home page - show todo list
app.get("/", (req, res) => {
    res.render("list", { ejes: items });
});

// POST: Add a new item
app.post("/", (req, res) => {
    const item = req.body.ele1;
    if (item.trim() !== "") {
        items.push(item);
    }
    res.redirect("/");
});

// POST: Delete an item by index
app.post("/delete", (req, res) => {
    const index = req.body.index;
    if (index !== undefined && index >= 0 && index < items.length) {
        items.splice(index, 1);
    }
    res.redirect("/");
});

// Start the server
app.listen(4000, () => {
    console.log("Server started on port 4000");
});
