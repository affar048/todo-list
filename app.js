const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method")); 

mongoose.connect("mongodb+srv://affaraffu:LkkSO09DVxd6XFeH@todotest.0kbztty.mongodb.net/?retryWrites=true&w=majority&appName=todotest")
    .then(() => {
        console.log("✅ Connected to MongoDB Atlas");
    })
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
    });

const itemSchema = new mongoose.Schema({
    name: String
});
const Item = mongoose.model("Item", itemSchema);
app.get("/", async (req, res) => {
    try {
        const items = await Item.find({});
        res.render("list", { ejes: items });
    } catch (err) {
        console.error("Error fetching items:", err);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/", async (req, res) => {
    const itemName = req.body.ele1;
    if (itemName.trim() !== "") {
        const newItem = new Item({ name: itemName });
        await newItem.save();
    }
    res.redirect("/");
});

app.put("/edit/:id", async (req, res) => {
    const itemId = req.params.id;
    const updatedText = req.body.newText;
    try {
        await Item.findByIdAndUpdate(itemId, { name: updatedText });
        res.redirect("/");
    } catch (err) {
        console.error("Error updating item:", err);
        res.status(500).send("Error updating item");
    }
});

app.delete("/delete/:id", async (req, res) => {
    const itemId = req.params.id;
    try {
        await Item.findByIdAndDelete(itemId);
        res.redirect("/");
    } catch (err) {
        console.error("Error deleting item:", err);
        res.status(500).send("Error deleting item");
    }
});
app.listen(8000, () => {
    console.log("Server is running");
});
