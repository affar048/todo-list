const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

let items = [];

app.get("/", (req, res) => {
    res.render("list", { ejes: items });
});

app.post("/", (req, res) => {
    const item = req.body.ele1;
    if (item.trim() !== "") {
        items.push(item);
    }
    res.redirect("/");
});

app.post("/delete", (req, res) => {
    const index = req.body.index;
    if (index !== undefined && index >= 0 && index < items.length) {
        items.splice(index, 1);
    }
    res.redirect("/");
});


app.post("/edit", (req, res) => {
    const index = req.body.index;
    const newText = req.body.newText;

    if (
        index !== undefined &&
        index >= 0 &&
        index < items.length &&
        newText.trim() !== ""
    ) {
        items[index] = newText.trim();
    }
    res.redirect("/");
});


app.listen(4000, () => {
    console.log("Server started on port 4000");
});
